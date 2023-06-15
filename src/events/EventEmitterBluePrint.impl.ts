class EventEmitterBluePrint {
  protected _maxListeners = 10;

  get defaultMaxListeners(): number {
    return this._maxListeners;
  }

  set defaultMaxListeners(n: number) {
    this._maxListeners = n;
  }

  get errorMonitor(): symbol {
    return Symbol.for("error");
  }
}

export const eventEmitterBluePrint = new EventEmitterBluePrint();
