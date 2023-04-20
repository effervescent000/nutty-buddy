<script lang="ts">
	import type { IItemRead, IRecipeRead } from '../../typing/interfaces';
	import type { TItemsById } from '../../typing/types';

	import ControlledTextInput from '../common/controlled-text-input.svelte';

	// PROPS
	export let recipes: IRecipeRead[];
	export let rawMaterials: TItemsById;
	export let steps: TItemsById;
	export let targetItem: IItemRead;

	// STATE
	let focusedRecipe: IRecipeRead | undefined = undefined;
	let selectedQuantity = 1;

	// LOGIC
</script>

<div class="border border-green flex gap-4 rounded-sm">
	<span>{targetItem?.name}</span>
	<div>
		{#each recipes as recipe}
			<span
				on:click={() => (focusedRecipe = recipe)}
				on:keypress={() => (focusedRecipe = recipe)}
				>{`Via ${recipe.method?.name || 'crafting'}`}</span
			>
		{/each}
	</div>
	<div class="flex">
		{#if focusedRecipe}
			<div class="flex flex-col">
				<ControlledTextInput
					value={selectedQuantity.toString()}
					callback={(value) => (selectedQuantity = +value)}
					testid="qty-input"
				/>
				{#each Object.values(rawMaterials) as rm}
					<span
						>{`${+(
							(rm.qty * selectedQuantity) /
							(targetItem.producedBy.find(
								({ recipeId }) => recipeId === focusedRecipe?.id
							)?.chance || 1)
						).toPrecision(3)} ${rm.name}`}</span
					>
				{/each}
			</div>
			<div>
				{#each Object.values(steps).reverse() as step}
					<div>
						<span>
							{`${step.qty * selectedQuantity} ${step.name}`}
						</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
