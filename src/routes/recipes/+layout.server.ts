import { db } from '../../db.server.js';
import { validateUser } from '../../utils/api-utils.js';

export const load = async ({ cookies }) => {
	const userId = validateUser(cookies);
	const items = await db.item.findMany({
		where: { userId },
		orderBy: { name: 'asc' }
	});
	const methods = await db.method.findMany({ where: { userId } });
	const requirements = await db.requirement.findMany({ where: { userId } });
	const recipes = await db.recipe.findMany({
		where: { userId },
		include: {
			components: {
				include: {
					item: true
				}
			},
			output: {
				include: {
					item: true
				}
			},
			recipeRequirements: { include: { requirement: true } }
		}
	});
	return { recipes, items, methods, requirements };
};
