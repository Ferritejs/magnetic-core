/// https://habr.com/ru/articles/490112/

/*
Func < A, T < C >> FishOperator<T>(Func < A, T < B >> f, Func < B, T < C >> g);
{
  return (x) => Bind(f(x), g);
}

Type<>;
*/
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

export const fn: GenericIdentityFn<string> = (v: string) => v;
