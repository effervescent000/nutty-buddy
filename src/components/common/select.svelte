<script lang="ts">
	// PROPS
	export let value: string;
	export let options: { value: string; name: string }[];
	export let label = '';
	export let testid = '';
	export let callback: (value: string) => void;
</script>

<div>
	{#if label}
		<span>{label}</span>
	{/if}
	<select
		data-testid={testid}
		{value}
		on:input={(event) => callback(event.currentTarget.value)}
	>
		{#each [{ name: '---', value: '' }, ...options] as option}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
</div>
