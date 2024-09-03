import type { TerminalEvent } from "../../enums.ts";

export type SendEventPayload = {
  readonly type: TerminalEvent;
  readonly action: TerminalEvent;
  // deno-lint-ignore no-explicit-any
  readonly data: Record<string, any>;
};

export type GetTerminalsOptions = {
  readonly perPage?: number;
  readonly next?: string;
  readonly previous?: string;
};
