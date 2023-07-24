import { TResult } from "../../fp";
import { IDecoder } from "./Decoder.iface";
import { Decoder } from "./Decoder.type";
import { IEncoder } from "./Encoder.iface";
import { Encoder } from "./Encoder.type";

export const translate = <T, TReturn>(
  translator: Encoder<T, TReturn> | Decoder<T, TReturn>,
  data: T,
  mode: "encode" | "decode" = "encode",
): Promise<TResult<TReturn>> => {
  if (typeof translator === "function") {
    return translator(data);
  } else if (
    (translator as IDecoder<T, TReturn>).decode &&
    !(translator as IEncoder<T, TReturn>).encode
  ) {
    return (translator as IDecoder<T, TReturn>).decode(data);
  } else if (
    (translator as IEncoder<T, TReturn>).encode &&
    !(translator as IDecoder<T, TReturn>).decode
  ) {
    return (translator as IEncoder<T, TReturn>).encode(data);
  } else {
    return mode === "encode"
      ? (translator as IEncoder<T, TReturn>).encode(data)
      : (translator as IDecoder<T, TReturn>).decode(data);
  }
};
