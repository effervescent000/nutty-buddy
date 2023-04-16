import { db } from '../../../db.server.js';
import { validateUser } from '../../../utils/api-utils.js';
import { getComponents } from '../../../utils/db-utils.js';

export const load = async ({ params, cookies }) => {
	const userId = validateUser(cookies);
	const item = await db.item.findFirst({
		where: { id: +params.itemId, userId },
		include: {
			mod: true,
			producedBy: {
				include: {
					recipe: {
						include: {
							method: true,
							recipeRequirements: {
								include: {
									requirement: true
								}
							},
							components: {
								include: {
									item: true
								}
							}
						}
					}
				}
			}
		}
	});

	if (item && item.producedBy.length) {
		const result = await getComponents(item.producedBy[0].recipe.components);
		const mergedResult = result.reduce(
			(acc, cur) => ({
				...acc,
				[cur.item.id]: {
					name: cur.item.name,
					qty: cur.qty + (acc[cur.item.id]?.qty || 0)
				}
			}),
			{} as { [id: number]: { name: string; qty: number } }
		);
		return { item, recipeValues: mergedResult };
	}
	return { item };
};
