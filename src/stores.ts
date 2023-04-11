import { writable } from 'svelte/store';

import type { IItem, IRecipe, IRequirement } from './typing/interfaces';

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

export const recipeStore = () => {
	const store = writable<IRecipe[]>([]);

	const { append, remove, replace } = createStoreFuncs(store);

	return {
		subscribe: store.subscribe,
		append,
		remove,
		replace
	};
};

export const requirementsStore = () => {
	const store = writable<IRequirement[]>([]);

	const { append, remove, replace } = createStoreFuncs(store);

	return {
		subscribe: store.subscribe,
		append,
		remove,
		replace
	};
};
