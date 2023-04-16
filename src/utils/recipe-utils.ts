import type { Item, RecipeComponents } from '@prisma/client';
import { queryItemWithComponents } from './db-utils';

export const getComponents = async (
	recipeJoins: (RecipeComponents & { item: Item })[]
): Promise<{ item: Item; qty: number }[]> => {
	const rawMaterials = [] as { item: Item; qty: number }[];
	const results = await queryItemWithComponents(
		recipeJoins.map(({ itemId }) => itemId)
	);
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
