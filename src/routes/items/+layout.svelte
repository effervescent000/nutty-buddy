<script lang="ts">
	import ItemsWrapper from '../../components/filters/items-wrapper.svelte';

	export let data;
</script>

<slot />
<ItemsWrapper items={data.items} />
