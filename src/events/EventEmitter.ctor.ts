import { IEventEmitter } from "./EventEmitter.iface";

export type EventEmitter = new () => IEventEmitter;
