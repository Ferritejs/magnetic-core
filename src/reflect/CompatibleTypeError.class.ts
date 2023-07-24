/**
 * @extends TypeError
 */
export class CompatibleTypeError extends TypeError {
  constructor(msg = "incompatible types") {
    super(msg);
  }
}
