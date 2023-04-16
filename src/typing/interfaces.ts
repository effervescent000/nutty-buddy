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
	quantityOwned?: number;
}

export interface IItemRead extends IItem {
	id: number;
	mod?: IModRead;
	producedBy: IRecipeOutput[];
}

export interface IRecipeRead {
	id: number;
	components: IRecipeComponent[];
	output: IRecipeOutput[];
	method: IMethodRead;
	recipeRequirements: IRecipeRequirement[];
}

interface IRecipeRequirement {
	recipe: IRecipeRead;
	requirement: IRequirementRead;
}

export interface IRecipeComponent {
	recipeId: number;
	itemId: number;
	recipe: IRecipeRead;
	item: IItemRead;
	quantity: number;
}

interface IRecipeOutput {
	recipeId: number;
	recipe: IRecipeRead;
	itemId: number;
	item: IItemRead;
	chance: number;
}

export interface IRequirement {
	name: string;
	completed: boolean;
}

export interface IRequirementRead extends IRequirement {
	id: number;
}

export interface IMethod {
	name: string;
}

export interface IMethodRead extends IMethod {
	id: number;

	recipes?: IRecipeRead[];
}
