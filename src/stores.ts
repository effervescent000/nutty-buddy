import { get, writable } from 'svelte/store';

import type { IItem } from './typing/interfaces';

import { arrayify } from './utils/general-utils';

export const itemStore = () => {
	const store = writable<IItem[]>([]);

	const append = (items: IItem[] | IItem) => {
		const toAppend = arrayify(items);
		store.update((curItems) => [...curItems, ...toAppend]);
	};

	const remove = (items: IItem | IItem[]) => {
		const toRemove = arrayify(items).map(({ id }) => id);
		store.update((curItems) =>
			curItems.filter((item) => !toRemove.includes(item.id))
		);
	};

	const replace = (itemToReplace: IItem, replacement: IItem) => {
		const copyOfStore = get(store);
		const foundIndex = copyOfStore.findIndex(
			(itemToCheck) => itemToCheck.id === itemToReplace.id
		);
		if (foundIndex) {
			copyOfStore[foundIndex] = replacement;
		}
		store.set(copyOfStore);
	};

	return {
		subscribe: store.subscribe,
		append,
		remove,
		replace
	};
};
