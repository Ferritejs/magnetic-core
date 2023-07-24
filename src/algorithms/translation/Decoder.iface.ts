import { Translator } from "./Translator.type";

export interface IDecoder<T, TReturn> {
  decode: Translator<T, TReturn>;
}
