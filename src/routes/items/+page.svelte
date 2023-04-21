<script lang="ts">
	import type { Mod } from '@prisma/client';
	import ItemInput from '../../components/items/new-item-card-v2.svelte';

	export let data: { mods: Mod[] };
</script>

<ItemInput mods={data.mods} action="create" />
