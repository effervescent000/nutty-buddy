<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '../../components/common/button.svelte';
	import UncontrolledTextInput from '../../components/common/uncontrolled-text-input.svelte';
	import MethodCard from '../../components/methods/method-card.svelte';

	// PROPS
	export let data;

	// STATE

	// LOGIC
</script>

<form method="post" action="?/create" use:enhance>
	<span>New method</span>
	<div>
		<UncontrolledTextInput
			name="name"
			testid="new-method-name"
			label="Method name"
			required
		/>
		<Button testid="method-submit" type="submit">Save</Button>
	</div>
</form>

{#each data.methods as method}
	<MethodCard {method} />
{/each}
