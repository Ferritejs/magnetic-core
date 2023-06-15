import { EventName, Listener } from "./types";

export interface IEventContext {
  eventName: EventName;
  listeners: Listener[];
  warned: boolean;
  isEmpty(): boolean;
  listenerCount(listener?: Listener): number;
  addListener(listener: Listener, once?: boolean): IEventContext;
  removeListener(listener: Listener): IEventContext;
  prependListener(listener: Listener, oneTime?: boolean): IEventContext;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propagate(...args: any[]): void;
}
