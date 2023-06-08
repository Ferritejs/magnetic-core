import { Listener } from "./types/Listener.type";

export interface IListenerContext {
  listener: Listener;
  once: boolean;
}
