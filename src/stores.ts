import { derived, writable } from 'svelte/store';

import type {
	IMod,
	IItem,
	IRecipe,
	IRequirement,
	IMinimalItem,
	IMethod
} from './typing/interfaces';

import { createCounterFuncs, createStoreFuncs } from './utils/store-utils';
import { makeLookupById } from './utils/general-utils';

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

export const focusedItem = writable<IItem | undefined>(undefined);

// CUSTOM STORES

export const itemStore = createMinimalItemStore<IItem>();
export const itemsById = derived(itemStore, ($itemStore) =>
	makeLookupById($itemStore)
);
export const itemCounter = createCounterStore();

export const recipeStore = createMinimalItemStore<IRecipe>();
export const recipesById = derived(recipeStore, ($recipeStore) =>
	makeLookupById($recipeStore)
);
export const recipeCounter = createCounterStore();

export const requirementStore = createMinimalItemStore<IRequirement>();
export const requirementsById = derived(requirementStore, ($requirementStore) =>
	makeLookupById($requirementStore)
);
export const requirementCounter = createCounterStore();

export const modStore = createMinimalItemStore<IMod>();
export const modsById = derived(modStore, ($modStore) =>
	makeLookupById($modStore)
);
export const modCounter = createCounterStore();

export const methodStore = createMinimalItemStore<IMethod>();
export const methodsById = derived(methodStore, ($methodStore) =>
	makeLookupById($methodStore)
);
export const methodsCounter = createCounterStore();
