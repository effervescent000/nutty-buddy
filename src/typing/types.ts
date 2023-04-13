import type { ITEM_TYPES } from '../constants/item-constants';
import type { IItem } from './interfaces';

export type TItemType =
	| typeof ITEM_TYPES.item
	| typeof ITEM_TYPES.liquid
	| typeof ITEM_TYPES.gas;

export type OmitIds<T> = {
	[K in keyof T]: T[K] extends { id: number }
		? Omit<T[K], 'id'>
		: T[K] extends Array<{ id: number }>
		? Array<OmitIds<T[K]>>
		: T[K];
};

export type TNewItem = Omit<IItem, 'id'>;
