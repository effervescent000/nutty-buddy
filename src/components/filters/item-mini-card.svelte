<script lang="ts">
	import type { Item } from '@prisma/client';

	import Icon from '../common/icon.svelte';
	import type { IItem, IItemRead } from '../../typing/interfaces';

	// PROPS
	export let item: IItemRead;

	// STATE

	// LOGIC
</script>

<div data-testid={`mini-card-${item.name}`} class="flex justify-between">
	<span>{item.name}</span>
	<div>
		<a href={`/items/${item.id}`}>
			<Icon icon="expand" />
		</a>
	</div>
</div>
