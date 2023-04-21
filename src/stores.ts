import { writable } from 'svelte/store';

export const userIdStore = writable<number | undefined>();

export const pinnedItemStore = writable<number[]>([]);
