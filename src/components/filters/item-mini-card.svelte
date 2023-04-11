<script lang="ts">
	import type { IItem } from '../../typing/interfaces';

	// PROPS
	export let item: IItem;

	// STATE

	// LOGIC
</script>

<div data-testid={`mini-card-${item.id}`}>
	<span>{item.name}</span>
</div>
