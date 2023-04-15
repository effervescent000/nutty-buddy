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
	const methodOptions = data.methods.map(({ id, name }) => ({
		value: id.toString(),
		name
	}));
	const requirementOptions = data.requirements.map(({ id, name }) => ({
		value: id.toString(),
		name
	}));
</script>

<form class="flex flex-col items-center" method="post">
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
				<UncontrolledSelect
					options={methodOptions}
					name="method"
					testid="method"
				/>
			</div>
			<div>
				<span>Requires?</span>
				{#each _.range(3) as i}
					<UncontrolledSelect
						options={requirementOptions}
						name={`requirement-${i}`}
						testid={`requirement-${i}`}
					/>
				{/each}
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
	<Button classes="w-12" testid="submit" type="submit">Save</Button>
</form>
