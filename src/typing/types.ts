import type { ITEM_TYPES } from '../constants/item-constants';

export type TItemType =
	| typeof ITEM_TYPES.item
	| typeof ITEM_TYPES.liquid
	| typeof ITEM_TYPES.gas;

export type TCleanedRecipeData = {
	method: number;
	reqs: { id: number }[];
	components: { slot: number; itemId?: number; qty?: number }[];
	output: { slot: number; itemId?: number; qty?: number }[];
};

export type TItemsById = { [id: number]: { name: string; qty: number } };
