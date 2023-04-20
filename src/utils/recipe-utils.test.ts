import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RECIPE_TREE, ids } from '../testing/world';
import * as dbUtils from './db-utils';
import { getComponents, type TComponents } from './recipe-utils';
import _ from 'lodash';

const STICK_COMPONENT_RESPONSE = {
	item: { name: 'stick', id: ids.stick },
	components: [
		{
			item: {
				item: {
					name: 'plank',
					id: ids.plank
				},
				components: [
					{
						item: { item: { name: 'log', id: ids.log }, components: [] },
						qty: 1
					}
				]
			},
			qty: 2
		}
	]
};

const ANDESITE_ALLOY_COMPONENT_RESPONSE = {
	item: { name: 'andesite alloy', id: ids.andesiteAlloy },
	components: [
		{
			item: {
				item: { id: ids.andesite, name: 'andesite' },
				components: []
			},
			qty: 2
		},
		{
			item: {
				item: { id: ids.ironNugget, name: 'iron nugget' },
				components: [
					{
						item: {
							item: {
								id: ids.gravel,
								name: 'gravel'
							},
							components: [
								{
									item: {
										item: {
											id: ids.cobblestone,
											name: 'cobblestone'
										},
										components: []
									},
									qty: 1
								}
							]
						},
						qty: 1
					}
				]
			},
			qty: 2
		}
	]
};

const pruneResponse = (response: TComponents): TComponents => {
	const item = _.pick(response.item, ['name', 'id']);
	const components = response.components.map((comp) => ({
		qty: comp.qty,
		item: pruneResponse(comp.item)
	}));

	return { item, components };
};

describe('tests of `getComponents`', () => {
	beforeEach(() => {
		const cb = (ids: number[]) =>
			Promise.resolve(ids.map((id) => RECIPE_TREE[id]));
		const spy = vi.spyOn(dbUtils, 'queryItemWithComponents');
		spy.mockImplementation(cb);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('handles simple recursion', async () => {
		expect(
			pruneResponse(await getComponents({ name: 'stick', id: ids.stick }))
		).toEqual(STICK_COMPONENT_RESPONSE);
	});

	it('handles the more complex case of andesite alloy', async () => {
		expect(
			pruneResponse(
				await getComponents({ name: 'andesite alloy', id: ids.andesiteAlloy })
			)
		).toEqual(ANDESITE_ALLOY_COMPONENT_RESPONSE);
	});
});
