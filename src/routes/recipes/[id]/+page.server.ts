import { db } from '../../../db.server.js';
import { validateUser } from '../../../utils/api-utils.js';

export const load = async ({ cookies, params: { id } }) => {
	validateUser(cookies);
	const recipe = await db.recipe.findFirst({
		where: { id: +id },
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
	return recipe;
};
