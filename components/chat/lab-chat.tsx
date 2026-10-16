'use client';

import {
  ArrowRight,
  ArrowUp,
  BookOpenText,
  LoaderCircle,
  MessageCircle,
  X,
} from 'lucide-react';
import {
  type KeyboardEvent,
  type SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Button } from '@/components/ui/button';
import { chatConfig } from '@/data/chat';
import type { LabChatResponse, LabChatSource } from '@/types/chat';

interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isWelcome?: boolean;
  sources?: LabChatSource[];
}

const initialMessage: DisplayMessage = {
  id: 'welcome',
  role: 'assistant',
  content: chatConfig.welcomeMessage,
  isWelcome: true,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function parseChatResponse(value: unknown): LabChatResponse | null {
  if (!isRecord(value) || typeof value.answer !== 'string') {
    return null;
  }

  if (!Array.isArray(value.sources)) {
    return null;
  }

  const sources: LabChatSource[] = [];

  for (const source of value.sources) {
    if (
      !isRecord(source) ||
      typeof source.label !== 'string' ||
      typeof source.href !== 'string' ||
      !source.href.startsWith('/') ||
      source.href.startsWith('//')
    ) {
      return null;
    }

    sources.push({ label: source.label, href: source.href });
  }

  return { answer: value.answer, sources };
}

function parseErrorResponse(value: unknown) {
  if (isRecord(value) && typeof value.error === 'string') {
    return value.error;
  }

  return null;
}

export function LabChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([initialMessage]);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const requestControllerRef = useRef<AbortController | null>(null);
  const shouldAutoScrollRef = useRef(true);
  const messageSequence = useRef(0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      if (window.matchMedia('(pointer: fine)').matches) {
        inputRef.current?.focus();
      }
    });

    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!shouldAutoScrollRef.current) {
      return;
    }

    const latestMessage = messages[messages.length - 1];

    if (latestMessage?.role === 'assistant' && !latestMessage.isWelcome) {
      lastMessageRef.current?.scrollIntoView({ block: 'start' });
    } else if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  useEffect(() => {
    return () => requestControllerRef.current?.abort();
  }, []);

  function nextMessageId(prefix: string) {
    messageSequence.current += 1;
    return `${prefix}-${messageSequence.current}`;
  }

  function closeChat() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleMessageScroll() {
    const transcript = messagesRef.current;

    if (!transcript) {
      return;
    }

    const distanceFromBottom =
      transcript.scrollHeight - transcript.scrollTop - transcript.clientHeight;

    shouldAutoScrollRef.current = distanceFromBottom < 80;
  }

  async function submitQuestion(rawQuestion: string) {
    const normalizedQuestion = rawQuestion.trim();

    if (!normalizedQuestion || isSending) {
      return;
    }

    if (normalizedQuestion.length > chatConfig.maxQuestionLength) {
      setError(
        `Keep your question under ${chatConfig.maxQuestionLength} characters.`,
      );
      return;
    }

    const userMessage: DisplayMessage = {
      id: nextMessageId('user'),
      role: 'user',
      content: normalizedQuestion,
    };

    shouldAutoScrollRef.current = true;
    setMessages((current) => [...current, userMessage]);
    setQuestion('');
    setError(null);
    setIsSending(true);

    const controller = new AbortController();
    requestControllerRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), 25_000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: normalizedQuestion }),
        signal: controller.signal,
      });
      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const responseError = parseErrorResponse(payload);
        throw new Error(
          responseError ?? 'The lab assistant could not answer right now.',
        );
      }

      const chatResponse = parseChatResponse(payload);

      if (!chatResponse) {
        throw new Error('The lab assistant returned an unexpected response.');
      }

      setMessages((current) => [
        ...current,
        {
          id: nextMessageId('assistant'),
          role: 'assistant',
          content: chatResponse.answer,
          sources: chatResponse.sources,
        },
      ]);
    } catch (requestError) {
      const message =
        requestError instanceof DOMException &&
        requestError.name === 'AbortError'
          ? 'The request took too long. Please try again.'
          : requestError instanceof Error
            ? requestError.message
            : 'The lab assistant is temporarily unavailable.';

      setError(message);
      setMessages((current) =>
        current.filter((item) => item.id !== userMessage.id),
      );
      setQuestion((current) => current || normalizedQuestion);
      requestAnimationFrame(() => inputRef.current?.focus());
    } finally {
      window.clearTimeout(timeoutId);
      requestControllerRef.current = null;
      setIsSending(false);
    }
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitQuestion(question);
  }

  function handleQuestionKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      void submitQuestion(question);
    }
  }

  return (
    <div className="fixed right-[max(0.5rem,env(safe-area-inset-right))] bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-50 flex max-w-[calc(100vw-1rem)] flex-col items-end gap-3 sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]">
      {isOpen ? (
        <dialog
          open
          id="aims-lab-chat"
          aria-modal="false"
          aria-labelledby="aims-lab-chat-title"
          aria-describedby="aims-lab-chat-description"
          className="animate-in fade-in slide-in-from-bottom-2 relative m-0 flex h-[min(42rem,calc(100dvh-6.5rem))] w-[calc(100vw-1rem)] max-w-[28rem] flex-col overflow-hidden rounded-sm border border-border border-t-[3px] border-t-primary bg-card p-0 text-card-foreground shadow-xl shadow-foreground/15 duration-200 motion-reduce:animate-none"
        >
          <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-4 py-4 sm:px-5">
            <div className="flex min-w-0 items-center gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center border border-primary/20 bg-primary/[0.06] text-primary">
                <BookOpenText className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.62rem] font-bold tracking-[0.18em] text-primary uppercase">
                  MSU Wood AI
                </p>
                <h2
                  id="aims-lab-chat-title"
                  className="truncate font-heading text-lg leading-6 font-semibold tracking-[-0.015em] text-foreground"
                >
                  {chatConfig.title}
                </h2>
                <p
                  id="aims-lab-chat-description"
                  className="mt-0.5 text-xs leading-5 text-muted-foreground"
                >
                  Approved public sources
                  {chatConfig.isPilot ? ' · Public pilot' : null}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              onClick={closeChat}
              aria-label="Close MSU Wood AI assistant"
              className="size-10 text-muted-foreground hover:bg-secondary hover:text-primary"
            >
              <X aria-hidden="true" />
            </Button>
          </header>

          <div
            ref={messagesRef}
            onScroll={handleMessageScroll}
            role="log"
            aria-busy={isSending}
            className="min-h-0 flex-1 space-y-5 overscroll-contain overflow-y-auto bg-background px-4 py-5 sm:px-5"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {messages.map((message) => {
              const isUser = message.role === 'user';
              const isLatest = message.id === messages[messages.length - 1]?.id;

              return (
                <div
                  key={message.id}
                  ref={isLatest ? lastMessageRef : undefined}
                  className={isUser ? 'ml-8' : 'mr-5'}
                >
                  <article
                    className={
                      isUser
                        ? 'border-r-2 border-primary bg-primary/[0.055] px-4 py-3.5 text-foreground'
                        : 'border-l-2 border-primary/45 bg-secondary/55 px-4 py-3.5 text-foreground'
                    }
                  >
                    <p
                      className={
                        isUser
                          ? 'text-[0.65rem] font-bold tracking-[0.16em] text-primary uppercase'
                          : 'text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground uppercase'
                      }
                    >
                      {isUser ? 'You' : 'MSU Wood AI'}
                    </p>
                    <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6">
                      {message.content}
                    </p>
                    {message.sources?.length ? (
                      <div className="mt-4 border-t border-border pt-3">
                        <p className="font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                          Sources
                        </p>
                        <ul className="mt-2 grid gap-1.5">
                          {message.sources.map((source, index) => (
                            <li key={source.href}>
                              <a
                                href={source.href}
                                className="group flex min-h-10 items-center justify-between gap-3 border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/[0.035] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <span className="flex min-w-0 items-center gap-2.5">
                                  <span className="font-mono text-[0.62rem] text-muted-foreground">
                                    {String(index + 1).padStart(2, '0')}
                                  </span>
                                  <span className="truncate">
                                    {source.label}
                                  </span>
                                </span>
                                <ArrowRight
                                  className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                                  aria-hidden="true"
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </article>
                </div>
              );
            })}

            {messages.length === 1 ? (
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                  Suggested questions
                </p>
                <div className="mt-2 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
                  {chatConfig.suggestedQuestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void submitQuestion(suggestion)}
                      className="min-h-16 border border-border bg-background px-3 py-3 text-left text-xs leading-5 font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-primary/[0.035] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="mb-1 block font-mono text-[0.62rem] text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {isSending ? (
              <output
                className="mr-5 flex items-center gap-2 border-l-2 border-primary/35 bg-secondary/55 px-4 py-3 text-sm text-muted-foreground"
                aria-atomic="true"
              >
                <LoaderCircle
                  className="size-4 animate-spin text-primary"
                  aria-hidden="true"
                />
                Searching approved sources…
              </output>
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-border bg-secondary/55 p-3.5"
          >
            <label htmlFor="aims-chat-question" className="sr-only">
              Ask MSU Wood AI a question
            </label>
            {error ? (
              <p
                id="aims-chat-error"
                className="mb-3 border border-destructive/20 bg-destructive/[0.06] px-3 py-2 text-xs leading-5 text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}
            <div className="grid grid-cols-[minmax(0,1fr)_2.5rem] items-end gap-2 border border-input bg-background p-2 transition-[border-color,box-shadow] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
              <textarea
                ref={inputRef}
                id="aims-chat-question"
                value={question}
                onChange={(event) => {
                  setQuestion(event.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={handleQuestionKeyDown}
                maxLength={chatConfig.maxQuestionLength}
                rows={2}
                readOnly={isSending}
                aria-busy={isSending}
                aria-invalid={error ? true : undefined}
                aria-describedby={
                  error
                    ? 'aims-chat-composer-hint aims-chat-privacy aims-chat-error'
                    : 'aims-chat-composer-hint aims-chat-privacy'
                }
                enterKeyHint="send"
                placeholder="Ask one question about our research, people, or products…"
                className="max-h-32 min-h-14 w-full resize-none border-0 bg-transparent px-1.5 py-1 text-base leading-6 text-foreground outline-none placeholder:text-muted-foreground read-only:cursor-wait read-only:opacity-60 sm:text-sm"
              />
              <Button
                type="submit"
                size="icon-lg"
                className="size-10 self-end shadow-sm"
                disabled={!question.trim() || isSending}
                aria-label="Send question"
              >
                {isSending ? (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                ) : (
                  <ArrowUp aria-hidden="true" />
                )}
              </Button>
            </div>
            <p
              id="aims-chat-composer-hint"
              className="mt-2 px-1 text-[0.68rem] leading-4 text-muted-foreground"
            >
              Enter to send · Shift + Enter for a new line
            </p>
            <p
              id="aims-chat-privacy"
              className="mt-1 px-1 text-xs leading-4 text-muted-foreground"
            >
              {chatConfig.disclaimer}
            </p>
          </form>
        </dialog>
      ) : null}

      <Button
        ref={triggerRef}
        type="button"
        size="lg"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="aims-lab-chat"
        aria-haspopup="dialog"
        className="h-12 gap-2 border border-white/20 px-4 font-semibold shadow-lg shadow-foreground/15 ring-2 ring-background transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
      >
        {isOpen ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-5" aria-hidden="true" />
        )}
        {isOpen ? 'Close chat' : chatConfig.title}
      </Button>
    </div>
  );
}
