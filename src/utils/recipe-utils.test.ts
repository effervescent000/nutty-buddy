import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RECIPE_TREE, ids } from '../testing/world';
import * as dbUtils from './db-utils';
import { getComponents } from './recipe-utils';

const responseFactory = (id: number, name: string, qty: number) => ({
	item: {
		id,
		name,
		producedBy: [],
		modId: null,
		quantity: null,
		type: 'item',
		userId: 1
	},
	qty
});

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
		).toEqual([responseFactory(ids.log, 'log', 1)]);
	});

	it('handles the more complex case of andesite alloy', async () => {
		expect(
			await getComponents([
				{ components: { itemId: ids.andesiteAlloy, quantity: 1 } }
			])
		).toEqual([
			responseFactory(ids.andesite, 'andesite', 2),
			responseFactory(ids.cobblestone, 'cobblestone', 2.5)
		]);
	});
});
