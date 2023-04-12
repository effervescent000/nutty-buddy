<script lang="ts">
	import Button from '../components/common/button.svelte';
	import UncontrolledTextInput from '../components/common/uncontrolled-text-input.svelte';
	import { URLS } from '../constants/url-constants';

	import { POST } from '../utils/api-utils';

	// LOGIC
	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		if (event.target) {
			const formData = new FormData(event.target as HTMLFormElement);
			const result = await POST(URLS.USERS, formData);
			console.log(result);
		}
	};
</script>

<form method="post" on:submit={handleSubmit}>
	<label for="username">
		<span>Username: </span>
		<UncontrolledTextInput
			id="username"
			name="username"
			autocomplete="off"
			testid="login-input"
		/>
	</label>
	<Button type="submit" testid="login-submit">Login</Button>
</form>
