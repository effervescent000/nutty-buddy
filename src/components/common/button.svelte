<script lang="ts">
	// PROPS
	export let callback = () => {
		// noop
	};
	export let testid = '';
	export let type: 'submit' | 'button' | undefined = 'button';
	export let classes = '';

	// STATE

	// LOGIC
</script>

<button
	{type}
	data-testid={testid}
	on:click={callback}
	class={`bg-off-white text-purple border border-green px-1 py-0.5 rounded-sm ${classes}`}
>
	<slot />
</button>
