<script lang="ts">
	import type { Item } from '@prisma/client';

	import ItemMiniCard from './item-mini-card.svelte';

	// PROPS

	export let items: Item[] | undefined;

	// STATE

	// LOGIC
</script>

<div class="grid grid-cols-8 gap-x-6 mt-4">
	{#if items}
		{#each items as item}
			<ItemMiniCard {item} />
		{/each}
	{/if}
</div>
