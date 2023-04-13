export const arrayify = <T>(item: T | T[]): T[] =>
	Array.isArray(item) ? item : [item];

export const makeLookupById = <T extends { id: number }>(list: T[]) =>
	list.reduce(
		(acc, cur) => ({ ...acc, [cur['id'] as number]: cur }),
		{} as { [id: number]: T }
	);

export const wrapData = <T>(data: T) => ({ data });

export const coerceFormDataEntryToNumber = (
	data: FormDataEntryValue | null
) => {
	if (data !== null) {
		return +data.toString();
	}
	return undefined;
};
