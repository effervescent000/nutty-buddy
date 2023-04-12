<script lang="ts">
	// PROPS
	export let value = '';
	export let callback: (value: string) => void;
	export let label = '';
	export let testid = '';
</script>

{#if label}
	<span>{label}</span>
{/if}
<input
	{value}
	on:input={(event) => callback(event.currentTarget.value)}
	data-testid={testid}
	class="bg-off-white rounded-sm border border-green"
/>
