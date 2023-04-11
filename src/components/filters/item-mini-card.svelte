<script lang="ts">
	import { focusedItem } from '../../stores';

	import type { IItem } from '../../typing/interfaces';

	import Icon from '../common/icon.svelte';

	// PROPS
	export let item: IItem;

	// STATE

	// LOGIC
</script>

<div data-testid={`mini-card-${item.id}`} class="flex">
	<span>{item.name}</span>
	<div>
		<Icon
			icon="expand"
			callback={() => focusedItem.set(item)}
			testid="focus-item"
		/>
	</div>
</div>
