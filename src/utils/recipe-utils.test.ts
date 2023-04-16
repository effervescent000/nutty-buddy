import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RECIPE_TREE, ids } from '../testing/world';
import * as dbUtils from './db-utils';
import { getComponents } from './recipe-utils';

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
			await getComponents([{ components: { itemId: ids.stick, quantity: 4 } }])
		).toEqual([{ item: { id: ids.log, name: 'log', producedBy: [] }, qty: 1 }]);
	});

	it('handles the more complex case of andesite alloy', async () => {
		expect(
			await getComponents([
				{ components: { itemId: ids.andesiteAlloy, quantity: 1 } }
			])
		).toEqual([
			{
				item: { id: ids.andesite, name: 'andesite', producedBy: [] },
				qty: 2
			},
			{
				item: { id: ids.cobblestone, name: 'cobblestone', producedBy: [] },
				qty: 2.5
			}
		]);
	});
});
