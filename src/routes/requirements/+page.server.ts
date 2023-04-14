import type { Requirement } from '@prisma/client';
import { db } from '../../db.server.js';
import { getNumericUserIdFromCookies } from '../../utils/api-utils.js';

export const load = async ({ cookies }) => {
	const userId = getNumericUserIdFromCookies(cookies);
	let requirements: Requirement[] = [];
	if (userId) {
		requirements = await db.requirement.findMany({ where: { userId } });
	}
	return { requirements };
};
