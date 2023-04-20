<script lang="ts">
	import NewItemCardV2 from '../../../components/items/new-item-card-v2.svelte';
	import RecipeDisplay from '../../../components/items/recipe-display.svelte';
	import type { IItemRead, IModRead } from '../../../typing/interfaces';
	import type { TItemsById } from '../../../typing/types';

	// PROPS
	export let data: {
		item: IItemRead;
		mods: IModRead[];
		rawMaterials: TItemsById;
		steps: {
			name: string;
			qty: number;
			depth: number;
		}[];
	};

	// STATE

	// LOGIC
</script>

<div class="grid grid-cols-2">
	<NewItemCardV2 item={data.item} mods={data.mods} />
	<RecipeDisplay
		recipes={data.item?.producedBy?.map(({ recipe }) => recipe) || []}
		rawMaterials={data.rawMaterials}
		steps={data.steps}
		targetItem={data.item}
	/>
</div>
