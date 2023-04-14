<script lang="ts">
	import { onMount } from 'svelte';

	import '../app.css';

	import { userIdStore } from '../stores';

	import Login from '../users/login.svelte';
	import NavBar from '../components/nav/nav-bar.svelte';

	// PROPS
	export let data;

	// LOGIC

	onMount(() => {
		if (typeof window !== 'undefined') {
			userIdStore.set(data.userId ? +data.userId : undefined);
		}
	});
</script>

<div class="flex justify-between">
	<NavBar />
	{#if !$userIdStore}
		<Login />
	{/if}
</div>

<slot />
