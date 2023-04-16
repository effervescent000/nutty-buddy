export const ids = {
	stick: 1,
	log: 2,
	plank: 3,
	andesite: 4,
	gravel: 5,
	cobblestone: 6,
	ironNugget: 7,
	andesiteAlloy: 8
};

const recipeTreeFactory = ({
	parent,
	components = []
}: {
	parent: { id: number; name: string; qty?: number };
	components?: { id: number; name: string; qty: number }[];
}) => ({
	[parent.id]: {
		id: parent.id,
		name: parent.name,
		producedBy: components.length
			? [
					{
						chance: parent.qty,
						recipe: {
							components: components.map(({ id, name, qty }) => ({
								quantity: qty,
								itemId: id,
								item: { id, name }
							}))
						}
					}
			  ]
			: []
	}
});

export const RECIPE_TREE = {
	...recipeTreeFactory({
		parent: { id: ids.stick, name: 'stick', qty: 4 },
		components: [{ id: ids.plank, name: 'plank', qty: 2 }]
	}),
	...recipeTreeFactory({
		parent: { id: ids.plank, name: 'plank', qty: 4 },
		components: [{ id: ids.log, name: 'log', qty: 1 }]
	}),
	...recipeTreeFactory({ parent: { id: ids.log, name: 'log' } }),
	...recipeTreeFactory({ parent: { id: ids.andesite, name: 'andesite' } }),
	...recipeTreeFactory({
		parent: { id: ids.andesiteAlloy, name: 'andesite alloy', qty: 1 },
		components: [
			{ id: ids.andesite, name: 'andesite', qty: 2 },
			{ id: ids.ironNugget, name: 'iron nugget', qty: 2 }
		]
	}),
	...recipeTreeFactory({
		parent: { id: ids.ironNugget, name: 'iron nugget', qty: 0.4 },
		components: [{ id: ids.gravel, name: 'gravel', qty: 1 }]
	}),
	...recipeTreeFactory({
		parent: { id: ids.gravel, name: 'gravel', qty: 1 },
		components: [{ id: ids.cobblestone, name: 'cobblestone', qty: 1 }]
	}),
	...recipeTreeFactory({ parent: { id: ids.cobblestone, name: 'cobblestone' } })
};
