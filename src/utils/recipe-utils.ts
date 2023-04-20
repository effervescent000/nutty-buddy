import { queryItemWithComponents } from './db-utils';

export type TMinimalItem = {
	name: string;
	id: number;
	producedBy?: { chance: number }[];
};

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

export const getRawMaterials = (componentTree: TComponents, neededQty = 1) => {
	const rawMaterials: { item: TMinimalItem; qty: number }[] = [];

	componentTree.components.forEach(({ item: components, qty }) => {
		if (components.components.length === 0) {
			rawMaterials.push({
				item: components.item,
				qty: Math.max(qty * neededQty, 1)
			});
		} else {
			rawMaterials.push(
				...getRawMaterials(
					components,
					(neededQty * qty) / (components.item.producedBy?.[0].chance || 1)
				)
			);
		}
	});

	return rawMaterials;
};
