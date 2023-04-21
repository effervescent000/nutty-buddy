import { db } from '../db.server';

export const queryItemWithComponents = async (ids: number[]) => {
	const items = await db.item.findMany({
		where: {
			id: {
				in: ids
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
				},
				orderBy: { recipeId: 'desc' }
			}
		}
	});
	return items;
};
