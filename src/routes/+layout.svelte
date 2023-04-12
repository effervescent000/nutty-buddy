<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import '../app.css';
	import {
		itemCounter,
		itemStore,
		methodStore,
		methodsCounter,
		modCounter,
		modStore,
		recipeCounter,
		recipeStore,
		requirementCounter,
		requirementStore
	} from '../stores';

	// SOME USEFUL CONSTANTS
	const ITEMS = 'items';
	const ITEM_COUNTER = 'itemCounter';
	const MODS = 'mods';
	const MOD_COUNTER = 'modsCounter';
	const RECIPES = 'recipes';
	const RECIPE_COUNTER = 'recipeCounter';
	const REQUIREMENTS = 'requirements';
	const REQUIREMENT_COUNTER = 'requirementCounter';
	const METHODS = 'methods';
	const METHOD_COUNTER = 'methodCounter';

	// LOGIC

	const unsubscribeFuncs: (() => void)[] = [];

	onMount(() => {
		if (typeof window !== 'undefined') {
			try {
				itemStore.set(JSON.parse(localStorage.getItem(ITEMS) || '[]'));
				itemCounter.set(+(localStorage.getItem(ITEM_COUNTER) || 1));
				modStore.set(JSON.parse(localStorage.getItem(MODS) || '[]'));
				modCounter.set(+(localStorage.getItem(MOD_COUNTER) || 1));
				recipeStore.set(JSON.parse(localStorage.getItem(RECIPES) || '[]'));
				recipeCounter.set(+(localStorage.getItem(RECIPE_COUNTER) || 1));
				requirementStore.set(
					JSON.parse(localStorage.getItem(REQUIREMENTS) || '[]')
				);
				requirementCounter.set(
					+(localStorage.getItem(REQUIREMENT_COUNTER) || 1)
				);
				methodStore.set(JSON.parse(localStorage.getItem(METHODS) || '[]'));
				methodsCounter.set(+(localStorage.getItem(METHOD_COUNTER) || 1));

				unsubscribeFuncs.push(
					...[
						itemStore.subscribe((newVal) => {
							localStorage.setItem(ITEMS, JSON.stringify(newVal));
						}),
						itemCounter.subscribe((newVal) =>
							localStorage.setItem(ITEM_COUNTER, newVal.toString())
						),
						modStore.subscribe((newVal) =>
							localStorage.setItem(MODS, JSON.stringify(newVal))
						),
						modCounter.subscribe((newVal) =>
							localStorage.setItem(MOD_COUNTER, newVal.toString())
						),
						recipeStore.subscribe((newVal) =>
							localStorage.setItem(RECIPES, JSON.stringify(newVal))
						),
						recipeCounter.subscribe((newVal) =>
							localStorage.setItem(RECIPE_COUNTER, newVal.toString())
						),
						requirementStore.subscribe((newVal) =>
							localStorage.setItem(REQUIREMENTS, JSON.stringify(newVal))
						),
						requirementCounter.subscribe((newVal) =>
							localStorage.setItem(REQUIREMENT_COUNTER, newVal.toString())
						),
						methodStore.subscribe((newVal) =>
							localStorage.setItem(METHODS, JSON.stringify(newVal))
						),
						methodsCounter.subscribe((newVal) =>
							localStorage.setItem(METHOD_COUNTER, newVal.toString())
						)
					]
				);
			} catch (error) {
				console.log('Error getting local storage, please clear it');
			}
		}
	});

	onDestroy(() => {
		unsubscribeFuncs.forEach((func) => func());
	});
</script>

<slot />
