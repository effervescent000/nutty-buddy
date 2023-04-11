<script lang="ts">
	// PROPS
	export let callback: () => void;
	export let testid = '';
	// STATE

	// LOGIC
</script>

<button
	data-testid={testid}
	on:click={callback}
	class="bg-off-white text-purple border border-green px-1 py-0.5"
	><slot /></button
>
