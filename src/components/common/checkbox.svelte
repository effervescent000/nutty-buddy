<script lang="ts">
	// PROPS
	export let initialValue = false;
	export let name: string;
	export let label = '';
	export let onChange = () => {
		// this does nothing
	};

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
	on:change={onChange}
	class="ml-1 rounded text-sm bg-off-white text-purple
	border-purple focus:ring-green focus:ring-offset-white"
/>
