<script lang="ts">
	import _ from 'lodash';
	import type {
		IItemRead,
		IMethodRead,
		IRecipeRead,
		IRequirementRead
	} from '../../typing/interfaces';
	import UncontrolledSelect from '../common/uncontrolled-select.svelte';
	import Button from '../common/button.svelte';
	import ItemInputsWrapper from './item-inputs-wrapper.svelte';

	// PROPS
	export let recipe: IRecipeRead = {} as IRecipeRead;
	export let data: {
		items: IItemRead[];
		methods: IMethodRead[];
		requirements: IRequirementRead[];
	};

	// STATE

	// LOGIC
</script>

<form class="flex flex-col items-center">
	<input type="hidden" name="id" value={recipe.id} />
	<div class="flex gap-4">
		<ItemInputsWrapper
			name="component"
			rawOptions={data.items}
			title="Recipe Components"
			subheader="Input"
		/>
		<div class="self-center">
			<div>
				<span>Method</span>
				<UncontrolledSelect options={[]} name="method" testid="method" />
			</div>
			<div>
				<span>Requires?</span>
				<UncontrolledSelect
					options={[]}
					name="requirement"
					testid="requirement"
				/>
			</div>
		</div>
		<ItemInputsWrapper
			name="output"
			rawOptions={data.items}
			title="Recipe outputs"
			subheader="Output"
			numInputs={3}
		/>
	</div>
	<Button classes="w-12">Save</Button>
</form>
