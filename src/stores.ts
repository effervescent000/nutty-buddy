import { get, writable } from 'svelte/store';

import type { IItem } from './typing/interfaces';

import { createStoreFuncs } from './utils/store-utils';

export const itemStore = () => {
	const store = writable<IItem[]>([]);

	const { append, remove, replace } = createStoreFuncs(store);

	return {
		subscribe: store.subscribe,
		append,
		remove,
		replace
	};
};
