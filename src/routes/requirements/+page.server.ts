import type { Requirement } from '@prisma/client';
import { db } from '../../db.server.js';
import {
	getNumericUserIdFromCookies,
	validateUser
} from '../../utils/api-utils.js';

export const load = async ({ cookies }) => {
	const userId = getNumericUserIdFromCookies(cookies);
	let requirements: Requirement[] = [];
	if (userId) {
		requirements = await db.requirement.findMany({ where: { userId } });
	}
	return { requirements };
};

export const actions = {
	create: async ({ request, cookies }) => {
		const userId = validateUser(cookies);
		const formData = await request.formData();
		const name = (formData.get('req-name') as FormDataEntryValue).toString();
		const req = await db.requirement.create({
			data: {
				name,
				user: {
					connect: { id: userId }
				}
			}
		});
		return { requirement: req };
	}
};
