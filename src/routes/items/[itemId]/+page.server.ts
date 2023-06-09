import _ from 'lodash';
import { db } from '../../../db.server.js';
import { validateUser } from '../../../utils/api-utils.js';
import {
	getComponents,
	getRawMaterials,
	makeSteps
} from '../../../utils/recipe-utils.js';
import { redirect } from '@sveltejs/kit';

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
		const componentTree = await getComponents(item);

		const rawMaterials = getRawMaterials(componentTree);
		const cleanedRawMaterials = rawMaterials.reduce(
			(acc, cur) => ({
				...acc,
				[cur.item.id]: {
					name: cur.item.name,
					qty: (acc[cur.item.id]?.qty || 0) + cur.qty
				}
			}),
			{} as { [id: number]: { name: string; qty: number } }
		);

		const steps = makeSteps(componentTree);
		const cleanedSteps = steps.reduceRight(
			(acc, cur) => ({
				...acc,
				[cur.item.id]: {
					name: cur.item.name,
					qty: (acc[cur.item.id]?.qty || 0) + cur.qty,
					depth: cur.depth
				}
			}),
			{} as { [id: number]: { name: string; qty: number; depth: number } }
		);

		const sortedSteps = _.sortBy(Object.values(cleanedSteps), 'depth');

		return { item, rawMaterials: cleanedRawMaterials, steps: sortedSteps };
	}
	return { item };
};

export const actions = {
	// this is the UPDATE FUNCTION DUMMY
	update: async ({ cookies, request, params }) => {
		const userId = validateUser(cookies);
		const itemId = +params.itemId;
		const formData = Object.fromEntries((await request.formData()).entries());
		const item = await db.item.update({
			where: { id: itemId },
			data: {
				name: formData['item-name']?.toString(),
				type: formData['item-type']?.toString(),
				mod: formData['mod-name']
					? {
							connectOrCreate: {
								where: {
									id: +formData['mod-id']?.toString()
								},
								create: {
									name: formData['mod-name'].toString(),
									user: {
										connect: { id: userId }
									}
								}
							}
					  }
					: undefined
			}
		});
		return { item };
	},
	delete: async ({ cookies, params }) => {
		validateUser(cookies);
		const itemId = +params.itemId;
		await db.item.delete({
			where: {
				id: itemId
			}
		});
		throw redirect(303, '/items');
	}
};
