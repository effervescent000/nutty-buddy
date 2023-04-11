export const arrayify = <T>(item: T | T[]): T[] =>
	Array.isArray(item) ? item : [item];
