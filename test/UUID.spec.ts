import { assert } from "chai";
import { UUID } from "~/UUID";

describe("tests of @core7/uuid", () => {
  describe("creates an item of UUID: `new UUID()`", () => {
    it("it doesn't throw any errors", () => {
      assert.doesNotThrow(() => new UUID());
    });
  });
  describe('creates an item of UUID: `new UUID("92fa397b-0244-4eb5-9a57-9c83cd046bca")`', () => {
    it("it doesn't throw any errors", () => {
      assert.doesNotThrow(
        () => new UUID("92fa397b-0244-4eb5-9a57-9c83cd046bca"),
      );
    });
  });
  describe('creates an item of UUID: `new UUID("HELLO")`', () => {
    it("it must throw the error", () => {
      assert.throw(() => new UUID("HELLO"));
    });
  });
  describe("generates an item of UUID: `UUID.genUUID4()`", () => {
    it("it doesn't throw any errors", () => {
      assert.doesNotThrow(() => UUID.genUUID4());
    });
  });
  describe("checks out an item of UUID: `UUID.match(UUID.genUUID4().toString())`", () => {
    it("it must be true", () => {
      assert.isTrue(UUID.match(UUID.genUUID4().toString()));
    });
  });
  describe('checks out the NIL UUID: `UUID.NIL === "00000000-0000-0000-0000-000000000000"`', () => {
    it("it must be true", () => {
      assert.isTrue(UUID.NIL === "00000000-0000-0000-0000-000000000000");
    });
  });
  describe("creates an item of UUID from NIL UUID: `new UUID(UUID.NIL)`", () => {
    it("it doesn't throw any errors", () => {
      assert.doesNotThrow(() => new UUID(UUID.NIL));
    });
  });
  describe("checks out an item of UUID which is created from NIL UUID: `new UUID(UUID.NIL).isNilUUID()`", () => {
    it("it must be true", () => {
      const uuid = new UUID(UUID.NIL);
      assert.isTrue(uuid.isNilUUID());
    });
  });
  describe("checks out a version of an item of UUID which is generated by `UUID.genUUID4()`: `UUID.genUUID4().version === 4`", () => {
    it("it must be true", () => {
      assert.isTrue(UUID.genUUID4().version === 4);
    });
  });
  describe("checks out a variant of an item of UUID: `UUID.genUUID4().variant === 1`", () => {
    it("it must be true", () => {
      assert.isTrue(UUID.genUUID4().variant === 1);
    });
  });
  describe("checks out a version of an item of UUID`: `new UUID(UUID.NIL).version === 0`", () => {
    it("it must be true", () => {
      assert.isTrue(new UUID(UUID.NIL).version === 0);
    });
  });
  describe("checks out a variant of an item of UUID: `new UUID(UUID.NIL).variant === 0`", () => {
    it("it must be true", () => {
      assert.isTrue(new UUID(UUID.NIL).variant === 0);
    });
  });
  describe('checks out URN of an item of UUID: `new UUID(UUID.NIL).URN === "urn:uuid:00000000-0000-0000-0000-000000000000"`', () => {
    it("it must be true", () => {
      assert.isTrue(
        new UUID(UUID.NIL).URN ===
          "urn:uuid:00000000-0000-0000-0000-000000000000",
      );
    });
  });
});
