<script lang="ts">
	import type { Item } from '@prisma/client';

	import Icon from '../common/icon.svelte';

	// PROPS
	export let item: Item;

	// STATE

	// LOGIC
</script>

<div data-testid={`mini-card-${item.name}`} class="flex">
	<span>{item.name}</span>
	<div>
		<a href={`/items/${item.id}`}>
			<Icon icon="expand" />
		</a>
	</div>
</div>
