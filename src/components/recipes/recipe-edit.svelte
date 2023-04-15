<script lang="ts">
	import _ from 'lodash';
	import type { IRecipeRead } from '../../typing/interfaces';
	import UncontrolledSelect from '../common/uncontrolled-select.svelte';
	import Button from '../common/button.svelte';

	// PROPS
	export let recipe: IRecipeRead = {} as IRecipeRead;

	// STATE

	// LOGIC
	const quantityOptions = _.range(9).map((i) => ({
		value: (i + 1).toString(),
		name: (i + 1).toString()
	}));
</script>

<form class="flex flex-col items-center">
	<input type="hidden" name="id" value={recipe.id} />
	<div class="flex gap-4">
		<div>
			<span>Recipe components</span>
			{#each _.range(4) as i}
				<div class="flex">
					<UncontrolledSelect
						name={`item-${i}`}
						testid={`item-select-${i}`}
						options={[]}
					/>
					<UncontrolledSelect
						name={`quantity-${i}`}
						testid={`qty-select-${i}`}
						options={quantityOptions}
					/>
				</div>
			{/each}
		</div>
		<div>
			<div>
				<span>Method</span>
				<UncontrolledSelect options={[]} name="method" />
			</div>
			<div>
				<span>Requires?</span>
				<UncontrolledSelect options={[]} name="requirement" />
			</div>
		</div>
		<div>
			<span>Recipe output</span>
			{#each _.range(3) as i}
				<div class="flex">
					<UncontrolledSelect
						name={`item-${i}`}
						testid={`item-select-${i}`}
						options={[]}
					/>
					<UncontrolledSelect
						name={`quantity-${i}`}
						testid={`qty-select-${i}`}
						options={quantityOptions}
					/>
				</div>
			{/each}
		</div>
	</div>
	<Button classes="w-12">Save</Button>
</form>
