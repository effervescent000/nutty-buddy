import { db } from '../../db.server.js';
import { validateUser } from '../../utils/api-utils.js';

export const load = async ({ cookies }) => {
	const userId = validateUser(cookies);
	const recipes = await db.recipe.findMany({ where: { userId } });
	return { recipes };
};
