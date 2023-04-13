<script lang="ts">
	import ItemInput from '../../components/items/new-item-card-v2.svelte';

	export let data;
</script>

<ItemInput mods={data.data} />
