import { db } from '../../db.server.js';

import { validateUser } from '../../utils/api-utils.js';

export const load = async ({ cookies }) => {
	const userId = validateUser(cookies);

	const items = await db.item.findMany({ where: { userId } });
	const methods = await db.method.findMany({ where: { userId } });
	const requirements = await db.requirement.findMany({ where: { userId } });

	return { items, methods, requirements };
};
