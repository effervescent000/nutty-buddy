<script lang="ts">
	import { page } from '$app/stores';

	// PROPS
	export let text: string;
	export let path: string;
	export let testid = '';

	// STATE
	let isActive = false;
	$: isActive = $page.url.pathname === path;

	// LOGIC
</script>

<span
	class={`text-purple border-b-2 ${isActive ? 'border-green' : 'border-white'}`}
>
	<a href={path} data-testid={testid}>{text}</a>
</span>
