import type { ITEM_TYPES } from '../constants/item-constants';

export type TItemType =
	| typeof ITEM_TYPES.item
	| typeof ITEM_TYPES.liquid
	| typeof ITEM_TYPES.gas;
