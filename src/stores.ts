import { writable } from 'svelte/store';

import type { IMod, IItem, IRecipe, IRequirement } from './typing/interfaces';

import { createStoreFuncs } from './utils/store-utils';

// CUSTOM STORE CREATORS

const createItemStore = () => {
	const store = writable<IItem[]>([]);

	const funcs = createStoreFuncs(store);

	return {
		subscribe: store.subscribe,
		...funcs
	};
};

const createRecipeStore = () => {
	const store = writable<IRecipe[]>([]);

	const funcs = createStoreFuncs(store);

	return {
		subscribe: store.subscribe,
		...funcs
	};
};

const createRequirementsStore = () => {
	const store = writable<IRequirement[]>([]);

	const funcs = createStoreFuncs(store);

	return {
		subscribe: store.subscribe,
		...funcs
	};
};

const createModsStore = () => {
	const store = writable<IMod[]>([]);
	return {
		subscribe: store.subscribe,
		...createStoreFuncs(store)
	};
};

export const itemStore = createItemStore();
export const recipeStore = createRecipeStore();
export const requirementStore = createRequirementsStore();
export const modStore = createModsStore();
