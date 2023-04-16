import { afterEach, describe, expect, it, vi } from 'vitest';

import { RECIPE_TREE, ids } from '../testing/world';
import * as dbUtils from './db-utils';
import { getComponents } from './recipe-utils';

describe('tests of `getComponents`', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it('handles simple recursion', async () => {
		const cb = (ids: number[]) =>
			Promise.resolve(ids.map((id) => RECIPE_TREE[id]));
		const spy = vi.spyOn(dbUtils, 'queryItemWithComponents');
		spy.mockImplementation(cb);
		expect(await getComponents([{ itemId: ids.stick, quantity: 4 }])).toEqual([
			{ item: { id: ids.log, name: 'log', producedBy: [] }, qty: 1 }
		]);
	});
});
