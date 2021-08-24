type Nullable<T> = T | null;
type Undefinable<T> = T | undefined;
type Nilable<T> = Nullable<Undefinable<T>>;
