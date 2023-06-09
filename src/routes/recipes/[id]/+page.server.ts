import _ from 'lodash';

import { db } from '../../../db.server.js';
import { validateUser } from '../../../utils/api-utils.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, params: { id } }) => {
	validateUser(cookies);
	const recipe = await db.recipe.findFirst({
		where: { id: +id },
		include: {
			components: {
				include: {
					item: true
				}
			},
			output: {
				include: {
					item: true
				}
			},
			recipeRequirements: { include: { requirement: true } },
			method: true
		}
	});
	return { recipe };
};

export const actions = {
	default: async ({ request, cookies, params }) => {
		validateUser(cookies);
		const id = +params.id;

		const formData = Object.fromEntries((await request.formData()).entries());

		const cleanedFormData = {
			method: +formData.method || undefined,
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

		cleanedFormData.components = cleanedFormData.components.filter(
			({ itemId }) => !!itemId
		);
		cleanedFormData.reqs = cleanedFormData.reqs.filter(({ id }) => !!id);
		cleanedFormData.output = cleanedFormData.output.filter(
			({ itemId }) => !!itemId
		);

		const existingRecipe = await db.recipe.findFirst({
			where: { id: +id },
			include: {
				components: {
					include: {
						item: true
					}
				},
				output: {
					include: {
						item: true
					}
				},
				recipeRequirements: { include: { requirement: true } },
				method: true
			}
		});

		if (existingRecipe?.method?.id !== cleanedFormData.method) {
			if (existingRecipe?.method?.id) {
				await db.recipe.update({
					where: { id: +id },
					data: {
						method: {
							disconnect: true
						}
					}
				});
			}
			if (cleanedFormData.method) {
				await db.recipe.update({
					where: { id: +id },
					data: {
						method: {
							connect: { id: cleanedFormData.method }
						}
					}
				});
			}
		}

		const existingComponents =
			existingRecipe?.components.map(({ itemId, quantity }) => ({
				itemId,
				quantity
			})) || [];
		const newComponents =
			cleanedFormData.components.map(({ itemId, qty }) => ({
				itemId,
				quantity: qty
			})) || [];

		const componentDiff =
			_.xorWith(existingComponents, newComponents, _.isEqual) || [];
		if (componentDiff.length) {
			for (const comp of componentDiff) {
				const foundInExisting = existingComponents.find(
					(exc) => exc.itemId === comp.itemId
				);
				const foundInNew = newComponents.find(
					(newc) => newc.itemId === comp.itemId
				);
				if (foundInExisting && foundInNew) {
					await db.recipeComponents.update({
						where: {
							itemId_recipeId: { itemId: comp.itemId as number, recipeId: id }
						},
						data: {
							quantity: foundInNew.quantity
						}
					});
				} else if (foundInExisting) {
					await db.recipe.update({
						where: { id: +id },
						data: {
							components: {
								deleteMany: {
									itemId: comp.itemId
								}
							}
						}
					});
				} else {
					await db.recipe.update({
						where: { id: +id },
						data: {
							components: {
								create: [
									{
										item: { connect: { id: comp.itemId } },
										quantity: foundInNew?.quantity
									}
								]
							}
						}
					});
				}
			}
		}

		const existingReqs =
			existingRecipe?.recipeRequirements.map(
				({ requirementId }) => requirementId
			) || [];
		const newReqs = cleanedFormData.reqs.map(({ id }) => id) || [];

		const reqDiff = _.xor(existingReqs, newReqs);
		if (reqDiff.length) {
			for (const req of reqDiff) {
				if (existingReqs.includes(req)) {
					await db.recipe.update({
						where: { id: +id },
						data: {
							recipeRequirements: {
								deleteMany: {
									requirementId: req
								}
							}
						}
					});
				} else {
					await db.recipe.update({
						where: { id: +id },
						data: {
							recipeRequirements: {
								create: [{ requirement: { connect: { id: req } } }]
							}
						}
					});
				}
			}
		}

		const existingOutput =
			existingRecipe?.output.map(({ itemId, chance }) => ({
				itemId,
				quantity: chance
			})) || [];
		const newOutput =
			cleanedFormData.output.map(({ itemId, qty }) => ({
				itemId,
				quantity: qty
			})) || [];

		const outputDiff = _.xorWith(existingOutput, newOutput, _.isEqual) || [];
		if (outputDiff.length) {
			for (const out of outputDiff) {
				const foundInExisting = existingOutput.find(
					(exo) => exo.itemId === out.itemId
				);
				const foundInNew = newOutput.find((newo) => newo.itemId === out.itemId);
				if (foundInExisting && foundInNew) {
					await db.recipeOutput.update({
						where: {
							itemId_recipeId: { itemId: out.itemId as number, recipeId: id }
						},
						data: {
							chance: foundInNew.quantity
						}
					});
				} else if (foundInExisting) {
					await db.recipe.update({
						where: { id: +id },
						data: {
							output: {
								deleteMany: {
									itemId: out.itemId
								}
							}
						}
					});
				} else {
					await db.recipe.update({
						where: { id: +id },
						data: {
							output: {
								create: [
									{
										item: { connect: { id: out.itemId } },
										chance: foundInNew?.quantity
									}
								]
							}
						}
					});
				}
			}
		}

		throw redirect(303, request.url);
	}
};
