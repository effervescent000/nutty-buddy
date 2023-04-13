<script lang="ts">
	import type { IItem, IModRead } from '../../typing/interfaces';

	import { ITEM_TYPES } from '../../constants/item-constants';

	import Button from '../common/button.svelte';
	import UncontrolledAutoComplete from '../common/uncontrolled-auto-complete.svelte';
	import UncontrolledSelect from '../common/uncontrolled-select.svelte';
	import UncontrolledTextInput from '../common/uncontrolled-text-input.svelte';

	// PROPS

	// STATE

	// LOGIC

	const itemTypeOptions = Object.values(ITEM_TYPES).map((type) => ({
		name: type,
		value: type
	}));

	const modOptions: IModRead[] = [];
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
		idName="mod-id"
		options={modOptions}
	/>
	<Button testid="new-item-save" type="submit">Save</Button>
</form>
