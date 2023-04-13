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
		<Icon
			icon="expand"
			callback={() => {
				// EMPTY
			}}
			testid="focus-item"
		/>
	</div>
</div>
