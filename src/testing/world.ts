export const ids = {
	stick: 1,
	log: 2,
	plank: 3
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
	...recipeTreeFactory({ parent: { id: ids.log, name: 'log' } })
};
