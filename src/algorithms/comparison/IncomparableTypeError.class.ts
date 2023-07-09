export class IncomparableTypeError extends TypeError {
  constructor(msg = "incomparable type") {
    super(msg);
  }
}
