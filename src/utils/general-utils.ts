import type { IMinimalItem } from '../typing/interfaces';

export const arrayify = <T>(item: T | T[]): T[] =>
	Array.isArray(item) ? item : [item];

export const makeLookupById = <T extends IMinimalItem>(list: T[]) =>
	list.reduce(
		(acc, cur) => ({ ...acc, [cur['id'] as number]: cur }),
		{} as { [id: number]: T }
	);
