<script lang="ts">
	import _ from 'lodash';
	import UncontrolledSelect from '../common/uncontrolled-select.svelte';
	import UncontrolledTextInput from '../common/uncontrolled-text-input.svelte';

	// PROPS
	export let title: string;
	export let numInputs = 4;
	export let rawOptions: { id: number; name: string }[];
	export let name: string;
	export let subheader: string;

	// STATE

	// LOGIC

	const cleanedOptions = rawOptions.map(({ id, name }) => ({
		value: id.toString(),
		name
	}));
</script>

<div class="w-min">
	<span>{title}</span>
	<div class="grid grid-cols-[3fr_1fr]">
		<span>{subheader}</span><span>Amount</span>
		{#each _.range(numInputs) as i}
			<UncontrolledSelect
				name={`${name}-${i}`}
				testid={`${name}-select-${i}`}
				options={cleanedOptions}
			/>
			<UncontrolledTextInput
				name={`${name}-qty-${i}`}
				testid={`${name}-qty-${i}`}
			/>
		{/each}
	</div>
</div>
