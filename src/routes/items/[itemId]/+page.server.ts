import { db } from '../../../db.server.js';
import { getNumericUserIdFromCookies } from '../../../utils/api-utils.js';

export const load = async ({ params, cookies }) => {
	const userId = getNumericUserIdFromCookies(cookies);
	if (userId) {
		const item = await db.item.findFirst({
			where: { id: +params.itemId },
			include: { mod: true }
		});
		return { item };
	}
	return { item: null };
};