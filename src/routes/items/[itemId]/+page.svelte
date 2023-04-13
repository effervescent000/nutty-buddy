<script lang="ts">
	import ItemEdit from '../../../components/items/item-edit.svelte';

	// PROPS
	export let data;

	// STATE

	// LOGIC
</script>

<ItemEdit item={data.item} mods={data.data.mods} />
