<script lang="ts">
	import { ITEM_TYPES } from '../../constants/item-constants';

	import type { IItemRead, IModRead } from '../../typing/interfaces';

	import Button from '../common/button.svelte';
	import UncontrolledAutoComplete from '../common/uncontrolled-auto-complete.svelte';
	import UncontrolledSelect from '../common/uncontrolled-select.svelte';
	import UncontrolledTextInput from '../common/uncontrolled-text-input.svelte';

	// PROPS

	export let mods: IModRead[];
	export let item: Partial<IItemRead> = {};

	// STATE

	// LOGIC

	const itemTypeOptions = Object.values(ITEM_TYPES).map((type) => ({
		name: type,
		value: type
	}));
</script>

<form method="post" class="flex flex-col gap-1 w-[20rem]">
	<input type="hidden" name="item-id" value={item.id} />
	<UncontrolledTextInput
		name="item-name"
		label="Name"
		testid="new-item-name"
		initialValue={item.name}
	/>
	<UncontrolledSelect
		name="item-type"
		label="Item type"
		options={itemTypeOptions}
		testid="new-item-type"
		initialValue={item.type}
	/>
	<UncontrolledAutoComplete
		label="Mod"
		nameName="mod-name"
		testid="new-item-mod"
		idName="mod-id"
		options={mods}
		initialValue={item.mod}
	/>
	<Button testid="new-item-save" type="submit" classes="w-min ml-10">
		Save
	</Button>
</form>
