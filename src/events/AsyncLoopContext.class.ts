/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEventEmitter } from "./EventEmitter.iface";
import { Callback, EventName } from "./types";

export class AsyncLoopContext {
  public aborted = false;
  public resolve: { value?: any[] } | undefined = undefined;
  public reject: { value?: any[] } | undefined = undefined;

  constructor(
    emitter: IEventEmitter,
    eventName: EventName,
    options?: { signal?: AbortSignal },
  ) {
    //
    const onEvent = this.onEvent.bind(this);
    const onError = this.onError.bind(this);

    emitter.on(eventName, onEvent);
    emitter.on("error", onError);

    if (typeof options === "object" && options.signal instanceof AbortSignal) {
      options.signal.onabort = () => {
        emitter.removeListener(eventName, onEvent);
        emitter.removeListener(eventName, onError);
      };
    }
  }

  onEvent(...args: any[]) {
    this.resolve = { value: args };
  }

  onError(...args: any[]) {
    this.reject = { value: args };
  }

  run(): AsyncIterator<any> {
    const next = (): Promise<any> => {
      return new Promise((resolve: Callback, reject: Callback) => {
        if (this.aborted) {
          reject(new Error("AbortError: The operation was aborted"));
        }
        this.createAsyncLoop(resolve, reject);
      });
    };

    return { next };
  }

  createAsyncLoop(resolve: Callback, reject: Callback) {
    const id = setInterval(() => {
      if (this.aborted) {
        return reject(new Error("The operation was aborted"));
      }
      if (this.resolve || this.reject) {
        clearInterval(id);
        if (this.resolve) {
          const value = this.resolve.value;
          this.resolve = undefined;
          return resolve(...(value ?? []));
        }
        if (this.reject) {
          const value = this.reject.value;
          this.reject = undefined;
          return reject(...(value ?? []));
        }
      }
    });
  }
}
