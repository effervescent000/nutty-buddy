import { get, type Writable } from 'svelte/store';

import type { IMinimalItem } from '../typing/interfaces';

import { arrayify } from './general-utils';

export const createStoreFuncs = (store: Writable<IMinimalItem[]>) => {
	const append = (items: IMinimalItem[] | IMinimalItem) => {
		const toAppend = arrayify(items);
		store.update((curItems) => [...curItems, ...toAppend]);
	};

	const remove = (items: IMinimalItem[] | IMinimalItem) => {
		const toRemove = arrayify(items).map(({ id }) => id);
		store.update((curItems) =>
			curItems.filter((item) => !toRemove.includes(item.id))
		);
	};

	const replace = (itemToReplace: IMinimalItem, replacement: IMinimalItem) => {
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
