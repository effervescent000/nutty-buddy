export interface IItem {
	name: string;
	id: number;
	type: 'item' | 'liquid' | 'gas';
	recipes: number[];
	quantity?: number;
}

export interface IRecipe {
	id: number;
	components: [id: number, quantity: number][];
	results: [id: number, quantity: number][];
	requires: number[];
}

export interface IRequirement {
	id: number;
	name: string;
	complete: boolean;
}
