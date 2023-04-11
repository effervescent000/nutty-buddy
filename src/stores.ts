import { writable } from 'svelte/store';

import type { IItem, IRecipe, IRequirement } from './typing/interfaces';

import { createStoreFuncs } from './utils/store-utils';

export const itemStore = () => {
	const store = writable<IItem[]>([]);

	const funcs = createStoreFuncs(store);

	return {
		subscribe: store.subscribe,
		...funcs
	};
};

export const recipeStore = () => {
	const store = writable<IRecipe[]>([]);

	const funcs = createStoreFuncs(store);

	return {
		subscribe: store.subscribe,
		...funcs
	};
};

export const requirementsStore = () => {
	const store = writable<IRequirement[]>([]);

	const funcs = createStoreFuncs(store);

	return {
		subscribe: store.subscribe,
		...funcs
	};
};
