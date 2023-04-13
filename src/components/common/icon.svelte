<script lang="ts">
	// PROPS
	export let icon: string;
	export let callback = () => {
		// this doesn't do anything
	};
	export let classes = '';
	export let testid = '';

	// STATE

	// LOGIC
</script>

<i
	class={`fa-solid fa-${icon} ${classes} cursor-pointer`}
	on:click={callback}
	on:keypress={callback}
	data-testid={testid}
/>
