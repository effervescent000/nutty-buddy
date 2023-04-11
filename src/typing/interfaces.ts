export interface IMinimalItem {
	id: number;
}

export interface IItem extends IMinimalItem {
	name: string;
	type: 'item' | 'liquid' | 'gas';
	recipes: number[];
	quantity?: number;
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
