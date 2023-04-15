<script lang="ts">
	import RecipeMiniCard from '../../components/recipes/recipe-mini-card.svelte';
	import type { IRecipeRead } from '../../typing/interfaces.js';

	// PROPS
	export let data: { recipes: IRecipeRead[] };

	// STATE

	// LOGIC
</script>

<slot />

{#if data.recipes.length}
	<div class="grid grid-cols-6">
		{#each data.recipes as recipe}
			<RecipeMiniCard {recipe} />
		{/each}
	</div>
{/if}
