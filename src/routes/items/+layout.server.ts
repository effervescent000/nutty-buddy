import { db } from '../../db.server';
import { validateUser } from '../../utils/api-utils';

export const load = async ({ cookies }) => {
	const userId = validateUser(cookies);
	const items = await db.item.findMany({
		where: { userId },
		orderBy: { name: 'asc' }
	});
	const mods = await db.mod.findMany({
		where: { userId },
		orderBy: { name: 'asc' }
	});
	return { items, mods };
};
