<script lang="ts">
	import type { IMethodRead } from '../../typing/interfaces';

	// PROPS
	export let method: IMethodRead;

	// STATE

	// LOGIC
</script>

<div
	data-testid={`method-card-${method.name}`}
	class="border border-green m-2 p-1"
>
	<span>{method.name}</span>
</div>
