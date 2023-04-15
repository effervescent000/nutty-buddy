<script lang="ts">
	import type {
		IItemRead,
		IMethodRead,
		IRecipeRead,
		IRequirementRead
	} from '../../../typing/interfaces';

	import RecipeEdit from '../../../components/recipes/recipe-edit.svelte';

	// PROPS
	export let data: {
		items: IItemRead[];
		methods: IMethodRead[];
		requirements: IRequirementRead[];
		recipe: IRecipeRead;
	};

	// STATE

	// LOGIC
</script>

<RecipeEdit recipe={data.recipe} {data} />
