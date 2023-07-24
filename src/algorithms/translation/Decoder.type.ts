import { IDecoder } from "./Decoder.iface";
import { Translator } from "./Translator.type";

export type Decoder<T, TReturn> = IDecoder<T, TReturn> | Translator<T, TReturn>;
