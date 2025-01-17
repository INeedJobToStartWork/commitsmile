//----------------------
// Functions
//----------------------

/**
 * Deep Omit  (Omit with "one.two.tree")
 * @description Omit properties from an object based on a path. Handles nested objects but not arrays.
 *
 * @param primaryObject - The main object from which properties are omitted
 * @param path - The path of properties to omit (Use Array to more paths)
 * @returns A new object with omitted properties
 *
 * @example
 * ```typescript
 * type TestObject = {
 *   one: {
 *     two: {
 *       tree: {
 *         four: string;
 *         five: number;
 *         six: boolean;
 *       }
 *     }
 *   }
 * }
 *
 * type Test1 = TDeepOmit<TestObject, "one.two.tree.four">;
 * // type Test1 = { one: { two: { tree: { five: number; six: boolean; };};};}
 * type Test2 = TDeepOmit<TestObject, ["one.two.tree.four", "one.two.tree.five"]>;
 * // type Test2 = { one: { two: { tree: { six: boolean; };};};}
 *
 * @dontexport
 * ```
 */
export type TDeepOmit<T, Path extends string | readonly string[]> = Path extends string
	? Path extends `${infer First}.${infer Rest}`
		? {
				[K in keyof T]: K extends First ? TDeepOmit<T[K], Rest> : T[K];
			}
		: {
				[K in keyof T as K extends Path ? never : K]: T[K];
			}
	: Path extends [infer First extends string, ...infer Rest extends string[]]
		? TDeepOmit<TDeepOmit<T, First>, Rest>
		: T;
