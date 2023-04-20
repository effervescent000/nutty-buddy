import type { IItemRead } from '../typing/interfaces';

import { queryItemWithComponents } from './db-utils';

export type TMinimalItem = Pick<IItemRead, 'name' | 'id'>;

export type TComponents = {
	item: TMinimalItem;
	components: { item: TComponents; qty: number }[];
};

export const getComponents = async (item: TMinimalItem) => {
	const [fullItem] = await queryItemWithComponents([item.id]);
	const componentTree: TComponents = { item: fullItem, components: [] };

	if (fullItem.producedBy.length) {
		for (const comp of fullItem.producedBy[0].recipe.components) {
			const result = await getComponents(comp.item);
			componentTree.components.push({ item: result, qty: comp.quantity });
		}
	}

	return componentTree;
};
