import { db } from '../../db.server.js';
import { validateUser } from '../../utils/api-utils.js';

export const load = async ({ cookies }) => {
	const userId = validateUser(cookies);
	const methods = await db.method.findMany({
		where: { userId },
		orderBy: { name: 'asc' }
	});
	return { methods };
};

export const actions = {
	create: async ({ request, cookies }) => {
		const userId = validateUser(cookies);
		const formData = await request.formData();
		const name = (formData.get('name') as FormDataEntryValue).toString();
		const method = await db.method.create({
			data: {
				name,
				user: {
					connect: { id: userId }
				}
			}
		});
		return { method };
	}
};
