<script lang="ts">
	import type { Item } from '@prisma/client';
	import { focusedItem } from '../../stores';

	import Icon from '../common/icon.svelte';

	// PROPS
	export let item: Item;

	// STATE

	// LOGIC
</script>

<div data-testid={`mini-card-${item.name}`} class="flex">
	<span>{item.name}</span>
	<div>
		<Icon
			icon="expand"
			callback={() => focusedItem.set(item)}
			testid="focus-item"
		/>
	</div>
</div>
