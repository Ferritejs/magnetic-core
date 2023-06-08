import { EventEmitter as Constructor } from "./EventEmitter.ctor";

let Ctor: Constructor;

if (typeof module === "object" && typeof module.exports === "object") {
  const { EventEmitter } = require("events");
  Ctor = EventEmitter;
} else {
  Ctor = require("./EventEmitter.class");
}

export default Ctor;
