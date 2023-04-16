<script lang="ts">
	import ItemEdit from '../../../components/items/item-edit.svelte';
	import NewItemCardV2 from '../../../components/items/new-item-card-v2.svelte';
	import RecipeDisplay from '../../../components/items/recipe-display.svelte';
	import type { IItemRead, IModRead } from '../../../typing/interfaces';

	// PROPS
	export let data: {
		item: IItemRead;
		mods: IModRead[];
		recipeValues: {
			[id: number]: {
				name: string;
				qty: number;
			};
		};
	};

	// STATE

	// LOGIC
</script>

<div class="grid grid-cols-2">
	<NewItemCardV2 item={data.item} mods={data.mods} />
	<RecipeDisplay
		recipes={data.item?.producedBy?.map(({ recipe }) => recipe) || []}
		recipeValues={data.recipeValues}
		targetItem={data.item}
	/>
</div>
