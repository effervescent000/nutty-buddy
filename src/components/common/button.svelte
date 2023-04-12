<script lang="ts">
	// PROPS
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	export let callback = () => {};
	export let testid = '';
	export let type: 'submit' | 'button' | undefined = 'button';
	// STATE

	// LOGIC
</script>

<button
	{type}
	data-testid={testid}
	on:click={callback}
	class="bg-off-white text-purple border border-green px-1 py-0.5"
	><slot /></button
>
