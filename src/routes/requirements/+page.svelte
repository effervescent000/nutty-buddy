<script lang="ts">
	import Button from '../../components/common/button.svelte';
	import UncontrolledTextInput from '../../components/common/uncontrolled-text-input.svelte';

	// PROPS
	export let data;

	// STATE

	// LOGIC
</script>

{#each data.requirements as req}
	<span>{req.name}</span>
{/each}

<form method="post">
	<div><span>New requirement</span></div>
	<UncontrolledTextInput label="Name" name="req-name" testid="req-name" />
	<Button type="submit">Save</Button>
</form>
