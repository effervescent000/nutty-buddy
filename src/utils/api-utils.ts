import { PUBLIC_ROOT_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export const GET = async (endpoint: string) => {
	try {
		const response = await fetch(`${PUBLIC_ROOT_URL}/api/${endpoint}`, {
			credentials: 'include'
		});
		return await response.json();
	} catch (error) {
		console.log(error);
		return json(error);
	}
};

export const POST = async (endpoint: string, body: FormData) => {
	try {
		const response = await fetch(`${PUBLIC_ROOT_URL}/api/${endpoint}`, {
			credentials: 'include',
			method: 'post',
			body
		});
		return await response.json();
	} catch (error) {
		console.log(error);
		return json(error);
	}
};
