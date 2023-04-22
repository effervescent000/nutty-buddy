<script lang="ts">
	import { pinnedItemStore } from '../../stores';
	import type { IItemRead } from '../../typing/interfaces';
	import Icon from '../common/icon.svelte';

	// PROPS
	export let item: IItemRead;

	// STATE

	// LOGIC
</script>

<div class="flex justify-between">
	<span>{item.name}</span>
	<div>
		<Icon
			icon="circle-xmark"
			callback={() =>
				pinnedItemStore.update((pins) => pins.filter((pin) => pin !== item.id))}
		/>
		<a href={`/items/${item.id}`}>
			<Icon icon="expand" />
		</a>
	</div>
</div>
