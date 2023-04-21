<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '../../../components/common/button.svelte';
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
	<div>
		<NewItemCardV2 item={data.item} mods={data.mods} action="update" />
		<form method="post" action="?/delete" use:enhance>
			<Button type="submit">Delete</Button>
		</form>
	</div>

	<RecipeDisplay
		recipes={data.item?.producedBy?.map(({ recipe }) => recipe) || []}
		rawMaterials={data.rawMaterials}
		steps={data.steps}
		targetItem={data.item}
	/>
</div>
