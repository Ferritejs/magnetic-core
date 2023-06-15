import { EventEmitter as Constructor } from "./EventEmitter.ctor";
import { EventEmitter } from "./EventEmitter.class";

const Ctor: Constructor = EventEmitter;

/*
if (typeof module === "object" && typeof module.exports === "object") {
  const { EventEmitter } = require("events");
  Ctor = EventEmitter;
} else {
  Ctor = EventEmitter;
}
*/
export default Ctor;
