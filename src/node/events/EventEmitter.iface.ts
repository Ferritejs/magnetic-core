import { EventName } from "./types/EventName.type";
import { Listener } from "./types/Listener.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IEventEmitter {
  addListener(eventName: EventName, listener: Listener): IEventEmitter;

  emit(eventName: EventName, ...args: any[]): boolean;

  eventNames(): EventName[];

  getMaxListeners(): number;

  listenerCount(eventName: EventName, listener?: Listener): number;

  listeners(eventName: EventName): Listener[];

  off(eventName: EventName, listener: Listener): IEventEmitter;

  on(eventName: EventName, listener: Listener): IEventEmitter;

  once(eventName: EventName, listener: Listener): IEventEmitter;
  prependListener(eventName: EventName, listener: Listener): IEventEmitter;

  prependOnceListener(eventName: EventName, listener: Listener): IEventEmitter;

  removeAllListeners(eventName?: string): IEventEmitter;

  removeListener(eventName: EventName, listener: Listener): IEventEmitter;

  setMaxListeners(n: number): IEventEmitter;

  rawListeners(eventName: EventName): Array<Listener>;
}
