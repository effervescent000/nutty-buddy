<script lang="ts">
	import type { IRecipeRead } from '../../typing/interfaces';

	import { getRecipeName } from '../../utils/general-utils';

	import Icon from '../common/icon.svelte';

	// PROPS
	export let recipe: IRecipeRead;

	// STATE

	// LOGIC
</script>

<div
	class="border border-green m-2 p-1 flex justify-between"
	data-testid={`recipe-card-${recipe.id}`}
>
	<span>{getRecipeName(recipe)}</span>
	<span><a href={`/recipes/${recipe.id}`}><Icon icon="expand" /></a></span>
</div>
