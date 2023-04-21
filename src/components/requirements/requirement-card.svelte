<script lang="ts">
	import { enhance } from '$app/forms';
	import type { IRequirementRead } from '../../typing/interfaces';
	import Checkbox from '../common/checkbox.svelte';

	// PROPS
	export let requirement: IRequirementRead;

	// STATE
	let form: HTMLFormElement;

	// LOGIC
</script>

<div
	data-testid={`req-card-${requirement.name}`}
	class="border border-green m-2 p-1"
>
	<form method="post" action="?/update" bind:this={form} use:enhance>
		<Checkbox
			name="completed"
			initialValue={requirement.completed}
			onChange={() => form.requestSubmit()}
		/>
		<span>{requirement.name}</span>
		<input type="hidden" name="req-id" value={requirement.id} />
		<input type="hidden" name="req-name" value={requirement.name} />
	</form>
</div>
