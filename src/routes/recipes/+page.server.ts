import { db } from '../../db.server.js';

import { validateUser } from '../../utils/api-utils.js';

export const load = async ({ cookies }) => {
	const userId = validateUser(cookies);

	const items = await db.item.findMany({ where: { userId } });
	const methods = await db.method.findMany({ where: { userId } });
	const requirements = await db.requirement.findMany({ where: { userId } });

	return { items, methods, requirements };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const userId = validateUser(cookies);
		const formData = Object.fromEntries((await request.formData()).entries());

		const cleanedFormData = {
			method: formData.method,
			reqs: [] as { id: number }[],
			components: [] as { slot: number; itemId?: number; qty?: number }[],
			output: [] as { slot: number; itemId?: number; qty?: number }[]
		};
		Object.entries(formData).forEach(([key, value]) => {
			const COMPONENT = 'component';
			const OUTPUT = 'output';
			const REQ = 'requirement';
			if (key.includes(COMPONENT)) {
				const match = key.match(/\d+/);
				if (match && match.length) {
					const i = +match[0];
					const found = cleanedFormData.components.find(
						(comp) => comp.slot === i
					);
					if (found) {
						// XXX	NOT SURE REASSIGNING FOUND WILL WORK
						if (key.includes('qty')) {
							found.qty = +value;
						} else {
							found.itemId = +value;
						}
					} else {
						if (key.includes('qty')) {
							cleanedFormData.components.push({ slot: i, qty: +value });
						} else {
							cleanedFormData.components.push({ slot: i, itemId: +value });
						}
					}
				}
			} else if (key.includes(OUTPUT)) {
				const match = key.match(/\d+/);
				if (match && match.length) {
					const i = +match[0];
					const found = cleanedFormData.output.find((out) => out.slot === i);
					if (found) {
						// XXX	NOT SURE REASSIGNING FOUND WILL WORK
						if (key.includes('qty')) {
							found.qty = +value;
						} else {
							found.itemId = +value;
						}
					} else {
						if (key.includes('qty')) {
							cleanedFormData.output.push({ slot: i, qty: +value });
						} else {
							cleanedFormData.output.push({ slot: i, itemId: +value });
						}
					}
				}
			} else if (key.includes(REQ)) {
				cleanedFormData.reqs.push({ id: +value });
			}
		});

		const recipe = await db.recipe.create({
			data: {
				user: { connect: { id: userId } },
				method: cleanedFormData.method
					? {
							connect: {
								id: +cleanedFormData.method
							}
					  }
					: undefined,
				recipeRequirements: {
					create: cleanedFormData.reqs.map((req) => ({
						requirement: {
							connect: { id: req.id }
						}
					}))
				},
				components: {
					create: cleanedFormData.components.map((comp) => ({
						quantity: comp.qty || 1,
						item: {
							connect: { id: comp.itemId }
						}
					}))
				},
				produces: {
					create: cleanedFormData.output.map((out) => ({
						chance: out.qty,
						item: {
							connect: { id: out.itemId }
						}
					}))
				}
			}
		});
		return recipe;
	}
};
