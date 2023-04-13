<script lang="ts">
	import { onMount } from 'svelte';

	import '../app.css';
	import { userIdStore } from '../stores';
	import Login from '../users/login.svelte';

	export let data;

	// LOGIC

	onMount(() => {
		if (typeof window !== 'undefined') {
			userIdStore.set(data.userId ? +data.userId : undefined);
		}
	});
</script>

{#if !$userIdStore}
	<div class="flex justify-end">
		<Login />
	</div>
{/if}

<slot />
