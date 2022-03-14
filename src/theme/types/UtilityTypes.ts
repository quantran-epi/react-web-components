export type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];

export type FilteredProperties<T, U> = { [K in FilteredKeys<T, U>]: T[K]; };
