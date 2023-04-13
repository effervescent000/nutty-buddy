import { json } from '@sveltejs/kit';

import type { IUser } from '../../../typing/interfaces.js';

import { db } from '../../../db.server.js';
import { wrapData } from '../../../utils/general-utils.js';

export const POST = async ({ request, cookies }) => {
	const data = await request.formData();
	const username = data.get('username')?.toString();

	if (username) {
		let user;
		user = await db.user.findFirst({ where: { name: username } });
		if (!user) {
			user = await db.user.create({ data: { name: username } });
		}
		cookies.set('userId', user.id.toString(), { httpOnly: false, path: '/' });

		return json(wrapData<IUser>(user));
	}
	return json(null);
};
