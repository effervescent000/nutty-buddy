import { json } from '@sveltejs/kit';
import { userIdStore } from '../stores';
import { get } from 'svelte/store';

export const GET = async (endpoint: string) => {
	try {
		const userId = get(userIdStore);
		const response = await fetch(
			`${import.meta.env.VITE_ROOT_URL}/api/${endpoint}`,
			{
				headers: userId
					? {
							'User-Id': userId.toString()
					  }
					: {}
			}
		);
		return await response.json();
	} catch (error) {
		console.log(error);
		return json(error);
	}
};

export const POST = async (endpoint: string, body: FormData) => {
	try {
		const userId = get(userIdStore);
		const response = await fetch(
			`${import.meta.env.VITE_ROOT_URL}/api/${endpoint}`,
			{
				headers: userId
					? {
							'User-Id': userId.toString()
					  }
					: {},
				method: 'post',
				body
			}
		);
		return await response.json();
	} catch (error) {
		console.log(error);
		return json(error);
	}
};

export const parseCookies = (cookies: string | null) => {
	if (!cookies) return {};

	const result = cookies
		.split(';')
		.map((cookie) => cookie.split('='))
		.reduce(
			(acc, cookie) => ({ ...acc, [cookie[0]]: cookie[1] }),
			{} as { [key: string]: string }
		);

	return result;
};
