import type { IItemRead, IRecipeComponent } from '../typing/interfaces';

import { queryItemWithComponents } from './db-utils';

export const getComponents = async (
	recipeJoins: {
		components: Pick<IRecipeComponent, 'itemId' | 'quantity'>;
		cumulativeMod?: number;
	}[]
): Promise<{ item: Pick<IItemRead, 'name' | 'id'>; qty: number }[]> => {
	const rawMaterials = [] as {
		item: Pick<IItemRead, 'name' | 'id'>;
		qty: number;
	}[];
	const results = await queryItemWithComponents(
		recipeJoins.map(({ components: { itemId } }) => itemId)
	);

	for (const item of results) {
		const matchedJoin = recipeJoins.find(
			({ components: { itemId } }) => item.id === itemId
		);
		if (item.producedBy.length) {
			const components = item.producedBy[0].recipe.components;
			if (components.length) {
				const subComponents = await getComponents(
					components.map((comp) => ({
						components: comp,
						cumulativeMod:
							item.producedBy[0].chance / (matchedJoin?.cumulativeMod || 1)
					}))
				);
				rawMaterials.push(...subComponents);
			}
		} else {
			rawMaterials.push({
				item,
				qty:
					(matchedJoin?.components.quantity || 1) *
					(matchedJoin?.cumulativeMod || 1)
			});
		}
	}
	return rawMaterials;
};
