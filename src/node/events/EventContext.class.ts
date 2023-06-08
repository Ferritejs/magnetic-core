import { IEventContext } from "./EventContext.iface";
import { IListenerContext } from "./ListenerContext.iface";
import { EventName, Listener } from "./types";

export class EventContext implements IEventContext {
  protected _eventName: EventName;
  protected _listeners: IListenerContext[] = [];
  protected _warned = false;

  constructor(eventName: EventName) {
    this._eventName = eventName;
  }

  get eventName(): EventName {
    return this._eventName;
  }

  get listeners(): Listener[] {
    return this._listeners.map((ctx: IListenerContext) => ctx.listener);
  }

  get warned(): boolean {
    return this._warned;
  }

  isEmpty(): boolean {
    return !this._listeners.length;
  }

  listenerCount(listener?: Listener): number {
    return listener
      ? this._listeners.filter((ctx) => ctx.listener === listener).length
      : this.listeners.length;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propagate(...args: any[]) {
    let flag = false;
    this._listeners.forEach((ctx: IListenerContext) => {
      ctx.listener(...args);
      flag = ctx.once || flag;
    });
    if (flag) {
      this._listeners = this._listeners.filter(
        (ctx: IListenerContext) => !ctx.once,
      );
    }
  }

  addListener(listener: Listener, once = false): IEventContext {
    this._listeners.push({ listener, once });
    return this;
  }

  prependListener(listener: Listener, once = false): IEventContext {
    this._listeners = [{ listener, once }, ...this._listeners];
    return this;
  }

  removeListener(listener: Listener): IEventContext {
    const list = this._listeners.filter(
      (ctx: IListenerContext) => ctx.listener !== listener,
    );
    if (list.length !== this._listeners.length) {
      this._listeners = list;
    }
    return this;
  }
}
