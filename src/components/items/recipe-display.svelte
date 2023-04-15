<script lang="ts">
	import type { IRecipeRead } from '../../typing/interfaces';

	import ControlledTextInput from '../common/controlled-text-input.svelte';

	// PROPS
	export let recipes: IRecipeRead[];

	// STATE
	let focusedRecipe: IRecipeRead | undefined = undefined;
	let selectedQuantity = 1;

	// LOGIC
</script>

<div class="border border-green flex rounded-sm">
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

				{#each focusedRecipe.components as comp}
					<span>{`${comp.quantity * selectedQuantity} ${comp.item.name}`}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
