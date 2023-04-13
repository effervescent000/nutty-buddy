<script lang="ts">
	import { ITEM_TYPES } from '../../constants/item-constants';

	import Button from '../common/button.svelte';
	import UncontrolledAutoComplete from '../common/uncontrolled-auto-complete.svelte';
	import UncontrolledSelect from '../common/uncontrolled-select.svelte';
	import UncontrolledTextInput from '../common/uncontrolled-text-input.svelte';
	import type { Mod } from '@prisma/client';

	// PROPS

	export let mods: Mod[];

	// STATE

	// LOGIC

	const itemTypeOptions = Object.values(ITEM_TYPES).map((type) => ({
		name: type,
		value: type
	}));
</script>

<form method="post">
	<UncontrolledTextInput name="item-name" label="Name" testid="new-item-name" />
	<UncontrolledSelect
		name="item-type"
		label="Item type"
		options={itemTypeOptions}
		testid="new-item-type"
	/>
	<UncontrolledAutoComplete
		label="Mod"
		nameName="mod-name"
		testid="new-item-mod"
		idName="mod-id"
		options={mods}
	/>
	<Button testid="new-item-save" type="submit">Save</Button>
</form>
