export const arrayify = <T>(item: T | T[]): T[] =>
	Array.isArray(item) ? item : [item];

export const makeLookup = (list: Record<string, unknown>[], key: string) =>
	list.reduce((acc, cur) => ({ ...acc, [key]: cur }), {});
