<script lang="ts">
	import type { Item } from '@prisma/client';

	import ItemMiniCard from './item-mini-card.svelte';
	import type { IItemRead } from '../../typing/interfaces';
	import ControlledTextInput from '../common/controlled-text-input.svelte';

	// PROPS

	export let items: IItemRead[] = [];

	// STATE
	let filteredItems: IItemRead[] = items;
	let outputFilter: string = '';

	$: filteredItems = items.filter((item) => item.name.includes(outputFilter));

	// LOGIC
</script>

<div class="mt-4">
	<div>
		<ControlledTextInput
			label="Filter by name"
			value={outputFilter}
			callback={(value) => (outputFilter = value)}
		/>
	</div>
	<div class="grid grid-cols-8 gap-x-6 mt-2">
		{#if filteredItems}
			{#each filteredItems as item}
				<ItemMiniCard {item} />
			{/each}
		{/if}
	</div>
</div>
