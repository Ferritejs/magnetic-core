import fp from "./fp";
import uuid from "./uuid";
import events from "./events";

export { fp, uuid, events };
export default { fp, uuid, events };

if (typeof window !== "undefined") {
  const core: object = {};

  Object.defineProperties(core, {
    fp: {
      value: fp,
      writable: false,
    },
    uuid: {
      value: uuid,
      writable: false,
    },
    events: {
      value: events,
      writable: false,
    },
  });

  Object.defineProperties(globalThis, {
    $mc: {
      value: core,
      writable: false,
    },
  });
}
