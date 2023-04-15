<script lang="ts">
	import ItemEdit from '../../../components/items/item-edit.svelte';
	import RecipeDisplay from '../../../components/items/recipe-display.svelte';
	import type { IItemRead, IModRead } from '../../../typing/interfaces';

	// PROPS
	export let data: {
		item: IItemRead;
		data: {
			mods: IModRead[];
		};
	};

	// STATE

	// LOGIC
</script>

<div class="grid grid-cols-2">
	<ItemEdit item={data.item} mods={data.data.mods} />
	<RecipeDisplay recipes={data.item.producedBy.map(({ recipe }) => recipe)} />
</div>
