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
<input type="checkbox" {name} bind:checked />
