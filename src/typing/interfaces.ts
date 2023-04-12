import type { TItemType } from './types';

export interface IMinimalItem {
	id?: number;
}

export interface IUser extends IMinimalItem {
	name: string;
}

export interface IMod extends IMinimalItem {
	name: string;
}

export interface IItem extends IMinimalItem {
	name: string;
	type: TItemType;
	mod?: number;
	recipes: number[];
	quantityOwned?: number;
}

export interface IRecipe extends IMinimalItem {
	components: [id: number, quantity: number][];
	results: [id: number, quantity: number][];
	requires: number[];
}

export interface IRequirement extends IMinimalItem {
	name: string;
	complete: boolean;
}

export interface IMethod extends IMinimalItem {
	name: string;
}
