/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { eventEmitterBluePrint } from "./EventEmitterBluePrint.impl";
import { Listener } from "./types/Listener.type";
import { EventName } from "./types/EventName.type";
import { IListenerContext } from "./ListenerContext.iface";
import { IEventContext } from "./EventContext.iface";
import { EventContext } from "./EventContext.class";
import { IEventEmitter } from "./EventEmitter.iface";

export class EventEmitter implements IEventEmitter {
  static readonly EventEmitter = EventEmitter;

  private static readonly __NEW_LISTENER_EVENT = "newListener";
  private static readonly __REMOVE_LISTENER_EVENT = "removeListener";

  protected _events: Map<EventName, IEventContext>;
  protected _maxListeners: number = eventEmitterBluePrint.defaultMaxListeners;

  constructor() {
    this._events = new Map();
  }

  addListener(eventName: EventName, listener: Listener): IEventEmitter {
    return this.on(eventName, listener);
  }

  emit(eventName: string | symbol, ...args: any[]): boolean {
    const ctx: IEventContext | undefined = this._events.get(eventName);
    ctx?.propagate(...args);
    ctx?.isEmpty() && this._events.delete(eventName);
    return !!ctx;
  }

  eventNames(): EventName[] {
    return Array.from(this._events.keys());
  }

  getMaxListeners(): number {
    return this._maxListeners;
  }

  listenerCount(eventName: EventName, listener?: Listener): number {
    return this._events.get(eventName)?.listenerCount(listener) ?? 0;
  }

  listeners(eventName: EventName): Listener[] {
    return this._events.get(eventName)?.listeners ?? [];
  }

  off(eventName: EventName, listener: Listener): IEventEmitter {
    const [ctx, flag] = listener
      ? [this._events.get(eventName)?.removeListener(listener), true]
      : [this._events.delete(eventName), false];
    if (flag && (ctx as IEventContext | undefined)?.isEmpty()) {
      this._events.delete(eventName);
    }
    return this;
  }

  protected _on(eventName: EventName, listenerCtx: IListenerContext): void {
    const [ctx, flag] = this._events.has(eventName)
      ? [this._events.get(eventName) as IEventContext, false]
      : [new EventContext(eventName), true];
    ctx.addListener(listenerCtx.listener, listenerCtx.once);
    flag && this._events.set(eventName, ctx);
  }

  on(eventName: EventName, listener: Listener): IEventEmitter {
    this._on(eventName, { listener, once: false });
    return this;
  }

  once(eventName: EventName, listener: Listener): IEventEmitter {
    this._on(eventName, { listener, once: true });
    return this;
  }

  prependListener(eventName: EventName, listener: Listener): IEventEmitter {
    this._events.get(eventName)?.prependListener(listener) ??
      this._on(eventName, { listener, once: false });
    return this;
  }

  prependOnceListener(eventName: EventName, listener: Listener): IEventEmitter {
    this._events.get(eventName)?.prependListener(listener, true) ??
      this._on(eventName, { listener, once: true });
    return this;
  }

  removeAllListeners(eventName?: EventName | undefined): IEventEmitter {
    if (eventName) {
      this._events.delete(eventName);
    } else {
      this._events = new Map();
    }
    return this;
  }

  removeListener(eventName: EventName, listener: Listener): IEventEmitter {
    this._events.get(eventName)?.removeListener(listener);
    return this;
  }

  setMaxListeners(n: number): IEventEmitter {
    this._maxListeners = n;
    return this;
  }

  rawListeners(eventName: EventName): Listener[] {
    return this._events.get(eventName)?.listeners ?? [];
  }
}
