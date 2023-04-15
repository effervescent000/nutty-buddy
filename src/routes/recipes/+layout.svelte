<script lang="ts">
	import type { IRecipeRead } from '../../typing/interfaces.js';
	import { getRecipeName } from '../../utils/general-utils.js';

	// PROPS
	export let data: { recipes: IRecipeRead[] };

	// STATE

	// LOGIC
</script>

<slot />

{#if data.recipes.length}
	{#each data.recipes as recipe}
		<span>{getRecipeName(recipe)}</span>
	{/each}
{/if}
