import type { TItemType } from './types';

export interface IUser {
	name: string;
}

export interface IMod {
	name: string;
}

export interface IModRead extends IMod {
	id: number;
}

export interface IItem {
	name: string;
	type: TItemType;
	mod?: IMod;
	recipes: number[];
	quantityOwned?: number;
}

export interface IItemRead extends IItem {
	id: number;
	mod?: IModRead;
}

export interface IRecipe {
	components: [id: number, quantity: number][];
	results: [id: number, quantity: number][];
	requires: number[];
}

export interface IRequirement {
	name: string;
	complete: boolean;
}

export interface IMethod {
	name: string;
}
