<script lang="ts">
	import type { IRecipeRead } from '../../typing/interfaces';

	import ControlledTextInput from '../common/controlled-text-input.svelte';

	// PROPS
	export let recipes: IRecipeRead[];
	export let recipeValues: {
		[id: number]: {
			name: string;
			qty: number;
		};
	};

	// STATE
	let focusedRecipe: IRecipeRead | undefined = undefined;
	let selectedQuantity = 1;

	// LOGIC
</script>

<div class="border border-green flex gap-4 rounded-sm">
	<div>
		{#each recipes as recipe}
			<span
				on:click={() => (focusedRecipe = recipe)}
				on:keypress={() => (focusedRecipe = recipe)}
				>{`Via ${recipe.method?.name || 'crafting'}`}</span
			>
		{/each}
	</div>
	<div>
		{#if focusedRecipe}
			<div class="flex flex-col">
				<ControlledTextInput
					value={selectedQuantity.toString()}
					callback={(value) => (selectedQuantity = +value)}
					testid="qty-input"
				/>

				{#each Object.values(recipeValues) as rv}
					<span>{`${rv.qty * selectedQuantity} ${rv.name}`}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
