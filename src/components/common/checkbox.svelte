<script lang="ts">
	// PROPS
	export let initialValue = false;
	export let name: string;
	export let label = '';

	// STATE
	let checked = initialValue;

	// LOGIC
</script>

{#if label}
	<span>{label}</span>
{/if}
<input
	type="checkbox"
	{name}
	bind:checked
	class="ml-1 rounded text-sm bg-off-white text-purple
	border-purple focus:ring-green focus:ring-offset-white"
/>
