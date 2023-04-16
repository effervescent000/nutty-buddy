<script lang="ts">
	// PROPS

	import NavLink from './nav-link.svelte';

	// STATE

	// LOGIC
	const LINKS: { text: string; path: string }[] = [
		{ text: 'Item management', path: '/items' },
		{ text: 'Recipe Management', path: '/recipes' },
		{ text: 'Method management', path: '/methods' },
		{ text: 'Requirement management', path: '/requirements' }
	];
</script>

<nav class="flex gap-4 text-xl mb-2">
	{#each LINKS as link}
		<NavLink {...link} />
	{/each}
</nav>
