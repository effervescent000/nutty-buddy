<script lang="ts">
	import Button from '../../components/common/button.svelte';
	import UncontrolledTextInput from '../../components/common/uncontrolled-text-input.svelte';

	// PROPS
	export let data;

	// STATE

	// LOGIC
</script>

<form method="post">
	<span>New method</span>
	<div>
		<UncontrolledTextInput
			name="name"
			testid="new-method-name"
			label="Method name"
			required
		/>
		<!-- intentionally leaving this as an untyped button so it 
    defaults to type="button". we're not ready to submit yet. -->
		<Button testid="method-submit">Save</Button>
	</div>
</form>
