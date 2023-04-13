<script lang="ts">
	// PROPS
	export let label = '';
	export let testid = '';
	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let initialValue: string | undefined = undefined;

	// STATE
	let value = initialValue || '';
</script>

{#if label}
	<span>{label}</span>
{/if}
<input
	bind:value
	{id}
	{name}
	data-testid={testid}
	autocomplete="off"
	class="bg-off-white rounded-sm border border-green"
/>
