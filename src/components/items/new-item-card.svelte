<script lang="ts">
	import { ITEM_TYPES } from '../../constants/item-constants';
	import { modStore } from '../../stores';
	import type { TItemType } from '../../typing/types';
	import AutoComplete from '../common/auto-complete.svelte';

	import Select from '../common/select.svelte';
	import TextInput from '../common/text-input.svelte';

	// PROPS

	// STATE
	let itemName = '';
	let itemType: TItemType | '' = '';
	let mod = '';
	let recipes: number[] = [];

	// LOGIC
	const itemTypeOptions = Object.values(ITEM_TYPES).map((type) => ({
		name: type,
		value: type
	}));
	$: modOptions = $modStore.map((mod) => ({ name: mod.name, value: mod.name }));
</script>

<div>
	<TextInput
		label="Item name"
		value={itemName}
		callback={(value) => {
			itemName = value;
		}}
		testid="new-item-name"
	/>
	<Select
		label="Item type"
		value={itemType}
		callback={(value) => (itemType = value)}
		options={itemTypeOptions}
		testid="new-item-type"
	/>
	<AutoComplete
		label="Mod origin"
		value={mod}
		callback={(value) => (mod = value)}
		options={modOptions}
		testid="new-item-mod"
	/>
</div>
