import { db } from '../../db.server';
import { getNumericUserIdFromCookies } from '../../utils/api-utils';
import { wrapData } from '../../utils/general-utils';

export const load = async ({ cookies }) => {
	const userId = getNumericUserIdFromCookies(cookies);
	if (userId) {
		const items = await db.item.findMany({ where: { userId } });
		const mods = await db.mod.findMany({ where: { userId } });
		return wrapData({ items, mods });
	}
	return wrapData({ items: [], mods: [] });
};
