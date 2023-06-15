/* eslint-disable @typescript-eslint/no-explicit-any */
import * as EE from "./EventEmitter.module";
export * from "./events.const";

export const EventEmitter = EE.default;

import { IEventEmitter } from "./EventEmitter.iface";
import { EventName, Listener } from "./types";
import { Callback } from "./types/Callback.type";
import { AsyncLoopContext } from "./AsyncLoopContext.class";

export const getEventListeners = (
  emitterOrTarget: IEventEmitter,
  eventName: EventName,
): Listener[] => emitterOrTarget.listeners(eventName);

export const getMaxListeners = (emitterOrTarget: IEventEmitter): number =>
  emitterOrTarget.getMaxListeners();

export const once = (
  emitter: IEventEmitter,
  name: EventName,
  options?: { signal?: AbortSignal },
): Promise<any> => {
  return new Promise((resolve: Callback, reject: Callback) => {
    const onEvent = (...args: any[]) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      emitter.removeListener(name, onError);
      resolve(...args);
    };

    const onError = (...args: any[]) => {
      emitter.removeListener(name, onEvent);
      reject(...args);
    };
    if (typeof options === "object" && options.signal instanceof AbortSignal) {
      options.signal.onabort = () => {
        emitter.removeListener(name, onEvent);
        emitter.removeListener(name, onError);
      };
    }

    emitter.once(name, onEvent);
    emitter.once("error", onError);
  });
};

export const on = (
  emitter: IEventEmitter,
  eventName: EventName,
  options?: { signal?: AbortSignal },
): AsyncIterator<any> => {
  const loop = new AsyncLoopContext(emitter, eventName, options);
  return loop.run();
};

export const setMaxListeners = (n: number, ...eventTargets: IEventEmitter[]) =>
  eventTargets.forEach((e: IEventEmitter) => e.setMaxListeners(n));
