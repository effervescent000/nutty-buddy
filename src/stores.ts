import { writable } from 'svelte/store';

import type {
	IMod,
	IItem,
	IRecipe,
	IRequirement,
	IMinimalItem
} from './typing/interfaces';

import { createCounterFuncs, createStoreFuncs } from './utils/store-utils';

// ********************
// CUSTOM STORE CREATORS
// ********************

const createMinimalItemStore = <T extends IMinimalItem>() => {
	const store = writable<T[]>([]);

	return {
		subscribe: store.subscribe,
		...createStoreFuncs<T>(store)
	};
};

const createCounterStore = () => {
	const store = writable(0);
	return {
		subscribe: store.subscribe,
		...createCounterFuncs(store)
	};
};

// ********************
// STORES
// ********************

export const itemStore = createMinimalItemStore<IItem>();
export const itemCounter = createCounterStore();

export const recipeStore = createMinimalItemStore<IRecipe>();
export const recipeCounter = createCounterStore();

export const requirementStore = createMinimalItemStore<IRequirement>();
export const requirementCounter = createCounterStore();

export const modStore = createMinimalItemStore<IMod>();
export const modCounter = createCounterStore();
