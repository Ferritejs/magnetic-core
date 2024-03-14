import { ThenableResult } from "../../fp";
import { IDecoder } from "./Decoder.iface";
import { Decoder } from "./Decoder.type";
import { IEncoder } from "./Encoder.iface";
import { Encoder } from "./Encoder.type";

export const translate = async <T, R>(
  translator: Encoder<T, R> | Decoder<T, R>,
  data: T,
  mode: "encode" | "decode" = "encode",
): Promise<ThenableResult<R>> => {
  if (typeof translator === "function") {
    return translator(data);
  } else if (
    (translator as IDecoder<T, R>).decode &&
    !(translator as IEncoder<T, R>).encode
  ) {
    return (translator as IDecoder<T, R>).decode(data);
  } else if (
    (translator as IEncoder<T, R>).encode &&
    !(translator as IDecoder<T, R>).decode
  ) {
    return (translator as IEncoder<T, R>).encode(data);
  } else {
    return mode === "encode"
      ? (translator as IEncoder<T, R>).encode(data)
      : (translator as IDecoder<T, R>).decode(data);
  }
};
