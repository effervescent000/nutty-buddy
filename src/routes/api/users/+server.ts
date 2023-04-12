import { json } from '@sveltejs/kit';

import type { IUser } from '../../../typing/interfaces.js';

import { db } from '../../../db.server.js';
import { wrapData } from '../../../utils/general-utils.js';

export const POST = async ({ request }) => {
	const { username } = await request.json();

	const user = await db.user.create({ data: { name: username } });
	return json(wrapData<IUser>(user));
};
