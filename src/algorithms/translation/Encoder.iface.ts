import { Translator } from "./Translator.type";

export interface IEncoder<T, TReturn> {
  encode: Translator<T, TReturn>;
}
