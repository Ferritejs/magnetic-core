/* eslint-disable @typescript-eslint/no-explicit-any */
import * as EE from "./EventEmitter.module";
export * from "./events.const";

export const EventEmitter = EE.default;

import { IEventEmitter } from "./EventEmitter.iface";
import { EventName, Listener } from "./types";

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
  return new Promise(
    (resolve: (...args: any[]) => void, reject: (...args: any[]) => void) => {
      const onEvent = (...args: any[]) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        emitter.removeListener(name, onError);
        resolve(...args);
      };

      const onError = (...args: any[]) => {
        emitter.removeListener(name, onEvent);
        reject(...args);
      };
      if (
        typeof options === "object" &&
        options.signal instanceof AbortSignal
      ) {
        options.signal.onabort = () => {
          emitter.removeListener(name, onEvent);
          emitter.removeListener(name, onError);
        };
      }

      emitter.once(name, onEvent);
      emitter.once("error", onError);
    },
  );
};

export const on = (
  emitter: IEventEmitter,
  name: EventName,
  options?: { signal?: AbortSignal },
): AsyncIterator<any> => {
  const ctx = {} as {
    id?: NodeJS.Timeout;
    resolve?: { value?: any[] };
    reject?: { value?: any[] };
  };

  const onEvent = (...args: any[]) => {
    ctx.resolve = { value: args };
  };

  const onError = (...args: any[]) => {
    ctx.reject = { value: args };
  };

  const next = async (): Promise<any> => {
    return new Promise(
      (resolve: (...args: any[]) => void, reject: (...args: any[]) => void) => {
        ctx.id = setInterval(() => {
          if (ctx.resolve) {
            const value = ctx.resolve.value;
            ctx.resolve = undefined;
            return resolve(value);
          }
          if (ctx.reject) {
            const value = ctx.reject.value;
            ctx.reject = undefined;
            return reject(value);
          }
        });
      },
    );
  };

  if (typeof options === "object" && options.signal instanceof AbortSignal) {
    options.signal.onabort = () => {
      clearInterval(ctx.id);
      emitter.removeListener(name, onEvent);
      emitter.removeListener(name, onError);
    };
  }

  return {
    next,
  };
};

export const setMaxListeners = (n: number, ...eventTargets: IEventEmitter[]) =>
  eventTargets.forEach((e: IEventEmitter) => e.setMaxListeners(n));
