<script lang="ts">
	import { itemStore } from '../../stores';

	import ItemMiniCard from './item-mini-card.svelte';

	// PROPS

	// STATE

	// LOGIC
</script>

{#each $itemStore as item}
	<ItemMiniCard {item} />
{/each}
