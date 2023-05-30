/**
 * This is an implementation of Universally Unique Identifier (UUID) URN Namespace
 * variant 1
 * version 4
 */
export class UUID extends String {
  static readonly HEX_BASE = 16;
  static readonly N_BYTES = 16;
  static readonly N_CHARS = UUID.N_BYTES * 2;
  static readonly NUMBERS_V1 = [8, 9, 10, 11];
  static readonly INTERVALS = [[0, 4], [4, 6], [6, 8], [8]];
  static readonly SIZE_OF_GROUPS = [8, 4, 4, 4, 12];
  static readonly VERSION_GROUP_INDEX = 2;
  static readonly VARIANT_GROUP_INDEX = 3;

  static readonly regexpV4 =
    /[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[8-b][\da-f]{3}-[\da-f]{12}/i;

  static readonly NIL: string = "00000000-0000-0000-0000-000000000000";

  private static getVariantGroupForUUIDv4(): string {
    const index = Math.round(Math.random() * 64) % 4;
    const N = UUID.NUMBERS_V1[index].toString(UUID.HEX_BASE);
    const xxx = UUID.getRandomHex(3);
    return `${N}${xxx}`;
  }

  private static getVersionGroupForUUIDv4(): string {
    return `${4}${UUID.getRandomHex(3)}`;
  }

  private static getRandomHex(num: number) {
    const acc = [];
    for (let i = 0; i < num; ++i) {
      const rnd = Math.round(Math.random() * 147 + Math.random() * 11);
      acc.push((rnd % 16).toString(UUID.HEX_BASE));
    }
    return acc.join("");
  }

  private static _genValueV4() {
    return UUID.SIZE_OF_GROUPS.map((amount: number, index: number) => {
      if (index === UUID.VARIANT_GROUP_INDEX) {
        return UUID.getVariantGroupForUUIDv4();
      } else if (index === UUID.VERSION_GROUP_INDEX) {
        return UUID.getVersionGroupForUUIDv4();
      } else {
        return UUID.getRandomHex(amount);
      }
    }).join("-");
  }

  static genUUID4(): UUID {
    return new UUID(UUID._genValueV4());
  }

  protected _version: number;
  protected _variant: number;

  constructor(value: string | UUID = "") {
    const v = value.toString();
    if (v === "" || UUID.match(v) || v === UUID.NIL) {
      super(v || UUID._genValueV4());
      if (this.isNilUUID()) {
        this._variant = 0;
        this._version = 0;
      } else {
        this._variant = 1;
        this._version = 4;
      }
    } else {
      throw new Error("format error");
    }
  }

  static match(value: string): boolean {
    return UUID.regexpV4.test(value);
  }

  get version(): number {
    return this._version;
  }

  get variant(): number {
    return this._variant;
  }

  get URN(): string {
    return `urn:uuid:${this}`;
  }

  isNilUUID(): boolean {
    return this.toString() === UUID.NIL;
  }
}

export default UUID;
