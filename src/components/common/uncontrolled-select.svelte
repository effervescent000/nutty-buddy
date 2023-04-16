<script lang="ts">
	// PROPS
	export let initialValue = '';
	export let options: { value: string; name: string }[];
	export let label = '';
	export let testid = '';
	export let name: string;

	// STATE
	let value = initialValue;
</script>

<div>
	{#if label}
		<span>{label}</span>
	{/if}
	<select
		{name}
		data-testid={testid}
		bind:value
		class="bg-off-white rounded-sm border border-green p-x-2 py-1"
	>
		{#each [{ name: '---', value: '' }, ...options] as option}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
</div>
