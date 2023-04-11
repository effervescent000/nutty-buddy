import { get, type Writable } from 'svelte/store';

import type { IMinimalItem } from '../typing/interfaces';

import { arrayify } from './general-utils';

export const createStoreFuncs = <T extends IMinimalItem>(
	store: Writable<T[]>
) => {
	const append = (items: T[] | T) => {
		const toAppend = arrayify(items);
		store.update((curItems) => [...curItems, ...toAppend]);
	};

	const remove = (items: T[] | T) => {
		const toRemove = arrayify(items).map(({ id }) => id);
		store.update((curItems) =>
			curItems.filter((item) => !toRemove.includes(item.id))
		);
	};

	const replace = (itemToReplace: T, replacement: T) => {
		const copyOfStore = get(store);
		const foundIndex = copyOfStore.findIndex(
			(itemToCheck) => itemToCheck.id === itemToReplace.id
		);
		if (foundIndex) {
			copyOfStore[foundIndex] = replacement;
		}
		store.set(copyOfStore);
	};

	return { append, remove, replace };
};

export const createCounterFuncs = (store: Writable<number>) => {
	const fetchAndIncrement = () => {
		const value = get(store);
		store.update((n) => n + 1);
		return value;
	};

	return { fetchAndIncrement };
};
