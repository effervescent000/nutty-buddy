<script lang="ts">
	import { enhance } from '$app/forms';
	import { ITEM_TYPES } from '../../constants/item-constants';

	import type { IItemRead, IModRead } from '../../typing/interfaces';

	import Button from '../common/button.svelte';
	import UncontrolledAutoComplete from '../common/uncontrolled-auto-complete.svelte';
	import UncontrolledSelect from '../common/uncontrolled-select.svelte';
	import UncontrolledTextInput from '../common/uncontrolled-text-input.svelte';

	// PROPS

	export let mods: IModRead[];
	export let item: Partial<IItemRead> = {};
	export let action: string;

	// STATE

	// LOGIC

	const itemTypeOptions = Object.values(ITEM_TYPES).map((type) => ({
		name: type,
		value: type
	}));
</script>

<form
	method="post"
	action={`?/${action}`}
	class="flex flex-col gap-1 w-[20rem]"
	use:enhance
>
	<input type="hidden" name="item-id" value={item.id} />
	<UncontrolledTextInput
		name="item-name"
		label="Name"
		testid="item-name"
		initialValue={item.name}
	/>
	<UncontrolledSelect
		name="item-type"
		label="Item type"
		options={itemTypeOptions}
		testid="item-type"
		initialValue={item.type}
	/>
	<UncontrolledAutoComplete
		label="Mod"
		nameName="mod-name"
		testid="item-mod"
		idName="mod-id"
		options={mods}
		initialValue={item.mod}
	/>
	<Button testid="item-save" type="submit" classes="w-min ml-10">Save</Button>
</form>
