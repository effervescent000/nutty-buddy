<script lang="ts">
	import ItemsWrapper from '../../components/filters/items-wrapper.svelte';
	import PinnedItemsWrapper from '../../components/items/pinned-items-wrapper.svelte';
	import type { IItemRead } from '../../typing/interfaces';

	export let data: { items: IItemRead[] };
</script>

<slot />
<PinnedItemsWrapper allItems={data.items} />
<ItemsWrapper items={data.items} />
