import { PUBLIC_ROOT_URL } from '$env/static/public';

export const GET = async (endpoint: string) => {
	const response = await fetch(`${PUBLIC_ROOT_URL}/api/${endpoint}`, {
		credentials: 'include'
	});
	return await response.json();
};

export const POST = async (endpoint: string, body: FormData) => {
	const response = await fetch(`${PUBLIC_ROOT_URL}/api/${endpoint}`, {
		credentials: 'include',
		method: 'post',
		body
	});
	return await response.json();
};
