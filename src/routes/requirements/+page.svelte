<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '../../components/common/button.svelte';
	import UncontrolledTextInput from '../../components/common/uncontrolled-text-input.svelte';
	import RequirementCard from '../../components/requirements/requirement-card.svelte';

	// PROPS
	export let data;

	// STATE

	// LOGIC
</script>

<form method="post" action="?/create" use:enhance>
	<div><span>New requirement</span></div>
	<UncontrolledTextInput label="Name" name="req-name" testid="req-name" />
	<Button type="submit" testid="req-submit">Save</Button>
</form>

<div class="grid grid-cols-6">
	{#each data.requirements as req}
		<RequirementCard requirement={req} />
	{/each}
</div>
