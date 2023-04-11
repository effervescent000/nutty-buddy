<script lang="ts">
	import {
		focusedItem,
		itemCounter,
		itemStore,
		modCounter,
		modStore,
		modsById
	} from '../../stores';

	import type { IItem, IMod } from '../../typing/interfaces';

	import { ITEM_TYPES } from '../../constants/item-constants';

	import AutoComplete from '../common/auto-complete.svelte';
	import Button from '../common/button.svelte';
	import Select from '../common/select.svelte';
	import TextInput from '../common/text-input.svelte';

	// PROPS

	// STATE
	let item: IItem;
	let modName: string;

	// LOGIC

	$: item = $focusedItem || { name: '', type: '', recipes: [] };
	$: modName = modName = item.mod ? $modsById[item.mod].name : '';

	const itemTypeOptions = Object.values(ITEM_TYPES).map((type) => ({
		name: type,
		value: type
	}));
	$: modOptions = $modStore.map((mod) => ({
		name: mod.name,
		value: mod.id as number
	}));

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
			maybeAddMod($focusedItem.mod);
			focusedItem.set(undefined);
		} else {
			const newItem = { ...item, id: itemCounter.fetchAndIncrement() };
			maybeAddMod(newItem.mod);
			itemStore.append(newItem);
			item = { name: '', type: '', recipes: [] };
		}
	};

	const maybeAddMod = (mod?: number) => {
		if (!mod) {
			modStore.append({ id: modCounter.fetchAndIncrement(), name: modName });
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
		value={modName}
		callback={(value) => {
			modName = value.name;
			if (value.value) {
				maybeUpdateFocusedItem('mod', value.value);
			}
		}}
		options={modOptions}
		testid="new-item-mod"
	/>
	<div>
		<Button callback={saveAndClearFields} testid="new-item-save">Save</Button>
	</div>
</div>
