<script lang="ts">
	import type { Item } from '@prisma/client';

	import ItemMiniCard from './item-mini-card.svelte';

	// PROPS

	export let items: Item[] | undefined;

	// STATE

	// LOGIC
</script>

{#if items}
	{#each items as item}
		<ItemMiniCard {item} />
	{/each}
{/if}
