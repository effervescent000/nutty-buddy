<script lang="ts">
	import { focusedItem, itemCounter, itemStore, modStore } from '../../stores';

	import type { IItem } from '../../typing/interfaces';
	import type { TItemType } from '../../typing/types';

	import { ITEM_TYPES } from '../../constants/item-constants';

	import AutoComplete from '../common/auto-complete.svelte';
	import Button from '../common/button.svelte';
	import Select from '../common/select.svelte';
	import TextInput from '../common/text-input.svelte';

	// PROPS

	// STATE
	let item: IItem;

	// LOGIC

	$: item = $focusedItem || { name: '', type: '', mod: '', recipes: [] };

	const itemTypeOptions = Object.values(ITEM_TYPES).map((type) => ({
		name: type,
		value: type
	}));
	$: modOptions = $modStore.map((mod) => ({ name: mod.name, value: mod.name }));

	const maybeUpdateFocusedItem = (key: string, newVal: any) => {
		if ($focusedItem) {
			focusedItem.update((curItem) =>
				curItem ? { ...curItem, [key]: newVal } : undefined
			);
		} else {
			item = { ...item, [key]: newVal };
		}
	};

	const saveAndClearFields = () => {
		if ($focusedItem) {
			itemStore.update($focusedItem);
			focusedItem.set(undefined);
		} else {
			itemStore.append({ ...item, id: itemCounter.fetchAndIncrement() });
			item = { name: '', type: '', mod: '', recipes: [] };
		}
	};
</script>

<div>
	<TextInput
		label="Item name"
		value={item.name}
		callback={(value) => maybeUpdateFocusedItem('name', value)}
		testid="new-item-name"
	/>
	<Select
		label="Item type"
		value={item.type}
		callback={(value) => maybeUpdateFocusedItem('type', value)}
		options={itemTypeOptions}
		testid="new-item-type"
	/>
	<AutoComplete
		label="Mod origin"
		value={item.mod || ''}
		callback={(value) => maybeUpdateFocusedItem('mod', value)}
		options={modOptions}
		testid="new-item-mod"
	/>
	<div>
		<Button callback={saveAndClearFields} testid="new-item-save">Save</Button>
	</div>
</div>
