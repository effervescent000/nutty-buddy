<script lang="ts">
	import { ITEM_TYPES } from '../../constants/item-constants';

	import type { IItemRead, IModRead } from '../../typing/interfaces';

	import UncontrolledTextInput from '../common/uncontrolled-text-input.svelte';
	import UncontrolledSelect from '../common/uncontrolled-select.svelte';
	import UncontrolledAutoComplete from '../common/uncontrolled-auto-complete.svelte';
	import Button from '../common/button.svelte';

	// PROPS
	export let item: IItemRead | null;
	export let mods: IModRead[];

	// STATE

	// LOGIC

	const itemTypeOptions = Object.values(ITEM_TYPES).map((type) => ({
		name: type,
		value: type
	}));
</script>

{#if item && mods}
	<form method="post">
		<UncontrolledTextInput
			name="item-name"
			label="Name"
			testid="edit-item-name"
			initialValue={item.name}
		/>
		<UncontrolledSelect
			name="item-type"
			label="Item type"
			options={itemTypeOptions}
			testid="edit-item-type"
			initialValue={item.type}
		/>
		<UncontrolledAutoComplete
			label="Mod"
			nameName="mod-name"
			testid="edit-item-mod"
			idName="mod-id"
			options={mods}
			initialValue={item.mod?.name}
		/>
		<Button testid="edit-item-save" type="submit">Save</Button>
	</form>
{/if}
