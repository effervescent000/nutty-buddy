<script lang="ts">
	import { userIdStore } from '../stores';
	import { invalidateAll } from '$app/navigation';

	import { URLS } from '../constants/url-constants';
	import { POST } from '../utils/api-utils';

	import Button from '../components/common/button.svelte';
	import UncontrolledTextInput from '../components/common/uncontrolled-text-input.svelte';

	// LOGIC
	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		if (event.target) {
			const formData = new FormData(event.target as HTMLFormElement);
			const result = await POST(URLS.USERS, formData);
			invalidateAll();
			userIdStore.set(result?.data?.id);
		}
	};
</script>

<form method="post" on:submit={handleSubmit}>
	<label for="username">
		<span>Username: </span>
		<UncontrolledTextInput id="username" name="username" testid="login-input" />
	</label>
	<Button type="submit" testid="login-submit">Login</Button>
</form>
