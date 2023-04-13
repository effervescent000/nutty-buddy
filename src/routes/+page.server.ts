import { GET } from '../utils/api-utils.js';

export const load = async () => {
	const response = await GET('items');
	return response;
};
