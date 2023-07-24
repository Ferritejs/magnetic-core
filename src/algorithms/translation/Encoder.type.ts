import { IEncoder } from "./Encoder.iface";
import { Translator } from "./Translator.type";

export type Encoder<T, TReturn> = IEncoder<T, TReturn> | Translator<T, TReturn>;
