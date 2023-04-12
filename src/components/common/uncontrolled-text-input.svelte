<script lang="ts">
	// PROPS
	export let label = '';
	export let testid = '';
	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let autocomplete: string | undefined = undefined;

	// STATE
	let value = '';
</script>

{#if label}
	<span>{label}</span>
{/if}
<input
	bind:value
	{id}
	{name}
	data-testid={testid}
	{autocomplete}
	class="bg-off-white rounded-sm border border-green"
/>
