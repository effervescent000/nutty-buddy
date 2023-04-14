<script lang="ts">
	import type { IRequirementRead } from '../../typing/interfaces';
	import Checkbox from '../common/checkbox.svelte';

	// PROPS
	export let requirement: IRequirementRead;

	// STATE

	// LOGIC
</script>

<div
	data-testid={`req-card-${requirement.name}`}
	class="border border-green m-2 p-1"
>
	<Checkbox name="completed" initialValue={requirement.completed} />
	<span>{requirement.name}</span>
</div>
