<script lang="ts">
	import { pinnedItemStore } from '../../stores';
	import type { IItemRead } from '../../typing/interfaces';
	import PinnedItem from './pinned-item.svelte';

	// PROPS
	export let allItems: IItemRead[];

	// STATE
	let pinnedItems = $pinnedItemStore;

	// LOGIC
	$: pinnedItems = $pinnedItemStore;
</script>

<div class="mt-4">
	<div class="grid grid-cols-8 gap-x-6 mt-2">
		{#each allItems.filter((item) => pinnedItems.includes(item.id)) as item}
			<PinnedItem {item} />
		{/each}
	</div>
</div>
