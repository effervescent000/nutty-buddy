<script lang="ts">
	import { itemStore } from '../../stores';

	import ItemMiniCard from './item-mini-card.svelte';

	// PROPS

	// STATE

	$: items = $itemStore;
	// LOGIC
</script>

{#each items as item}
	<ItemMiniCard {item} />
{/each}
