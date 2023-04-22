import { redirect } from '@sveltejs/kit';
import { db } from '../../db.server.js';
import { validateUser } from '../../utils/api-utils.js';
import { coerceFormDataEntryToNumber } from '../../utils/general-utils.js';

export const load = async ({ cookies }) => {
	const userId = validateUser(cookies);

	const requirements = await db.requirement.findMany({
		where: { userId },
		orderBy: { name: 'asc' }
	});
	return { requirements };
};

export const actions = {
	create: async ({ request, cookies }) => {
		const userId = validateUser(cookies);
		const formData = await request.formData();
		const name = (formData.get('req-name') as FormDataEntryValue).toString();
		await db.requirement.create({
			data: {
				name,
				user: {
					connect: { id: userId }
				}
			}
		});
		throw redirect(303, '/requirements');
	},
	update: async ({ request, cookies }) => {
		validateUser(cookies);
		const formData = await request.formData();
		const id = coerceFormDataEntryToNumber(formData.get('req-id')) as number;
		const completed = formData.get('completed') === 'on' ? true : false;
		await db.requirement.update({
			where: { id },
			data: { completed }
		});
		throw redirect(303, '/requirements');
	}
};
