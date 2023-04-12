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
			// load from local storage here

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
		}
	});

	onDestroy(() => {
		unsubscribeFuncs.forEach((func) => func());
	});
</script>

<slot />
