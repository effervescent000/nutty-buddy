import type { Item, RecipeComponents } from '@prisma/client';

import { db } from '../db.server';

export const getComponents = async (
	recipeJoins: (RecipeComponents & { item: Item })[]
): Promise<{ item: Item; qty: number }[]> => {
	const rawMaterials = [] as { item: Item; qty: number }[];
	const results = await db.item.findMany({
		where: {
			id: {
				in: recipeJoins.map(({ itemId }) => itemId)
			}
		},
		include: {
			producedBy: {
				include: {
					recipe: {
						include: {
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
	for (const item of results) {
		if (item.producedBy.length) {
			const components = item.producedBy[0].recipe.components;
			if (components.length) {
				const subComponents = await getComponents(
					components.map((comp) => comp)
				);
				return subComponents;
			}
		} else {
			rawMaterials.push({
				item,
				qty: recipeJoins.find(({ itemId }) => item.id === itemId)?.quantity || 1
			});
		}
	}
	return rawMaterials;
};
