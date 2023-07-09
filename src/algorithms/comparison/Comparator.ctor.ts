import { Comparator } from "./Comparator.type";
import {
  NOT_LESS,
  NOT_EQUAL,
  NOT_GREATER,
  INCOMPARABLE,
  EQUAL,
  GREATER,
  LESS,
} from "./Comparison.type";

type Code = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const mapper = <T, C extends Comparator<T, boolean> = Comparator<T, boolean>>(
  code: Code,
  less?: Comparator<T, boolean>,
  equal?: Comparator<T, boolean>,
  greater?: Comparator<T, boolean>,
  // eslint-disable-next-line sonarjs/cognitive-complexity
): Comparator<T> => {
  switch (code) {
    case 1: // --l
      return (f: T, s: T) => ((less as C)(f, s) ? LESS : NOT_LESS);
    // break;
    case 2: // -e-
      return (f: T, s: T) => ((equal as C)(f, s) ? EQUAL : NOT_EQUAL);
    // break;
    case 3: // -el
      return (f: T, s: T) => {
        if ((less as C)(f, s)) return LESS;
        else if ((equal as C)(f, s)) return EQUAL;
        else return GREATER;
      };
    // break;
    case 4: // g--
      return (f: T, s: T) => ((greater as C)(f, s) ? GREATER : NOT_GREATER);
    // break;
    case 5: // g-l
      return (f: T, s: T) => {
        if ((less as C)(f, s)) return LESS;
        else if ((greater as C)(f, s)) return GREATER;
        else return EQUAL;
      };
    // break;
    case 6: // ge-
      return (f: T, s: T) => {
        if ((equal as C)(f, s)) return EQUAL;
        else if ((greater as C)(f, s)) return GREATER;
        else return LESS;
      };
    // break;
    case 7: // gel
      return (f: T, s: T) => {
        if ((less as C)(f, s)) return LESS;
        else if ((equal as C)(f, s)) return EQUAL;
        else if ((greater as C)(f, s)) return GREATER;
        else return INCOMPARABLE;
      };
    // break;
    default: // ---
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return (f: T, s: T) => INCOMPARABLE;
  }
};

export const createComparator = <T>({
  less = undefined,
  equal = undefined,
  greater = undefined,
}: {
  less?: Comparator<T, boolean>;
  equal?: Comparator<T, boolean>;
  greater?: Comparator<T, boolean>;
} = {}): Comparator<T> => {
  const code = [less, equal, greater]
    .map((fn, i) => [2 ** i, fn])
    .filter((pair) => pair.at(-1))
    .reduce((p, c) => p ^ (c[0] as number), 0);
  return mapper<T>(code as Code, less, equal, greater);
};
