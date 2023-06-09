import { json } from '@sveltejs/kit';

import { db } from '../../../db.server.js';
import { wrapData } from '../../../utils/general-utils.js';

export const POST = async ({ request }) => {
	const userId = request.headers.get('User-Id');
	const data = await request.formData();

	const itemId = +(data.get('id')?.toString || 0);
	const itemName = data.get('name')?.toString();
	const itemType = data.get('type')?.toString();
	const mod = JSON.parse(data.get('mod')?.toString() || '{}');

	try {
		if (userId) {
			let item;
			if (itemId) {
				item = await db.item.update({
					where: { id: itemId },
					data: { name: itemName, type: itemType }
				});
			} else if (itemName && itemType) {
				item = await db.item.create({
					data: {
						name: itemName,
						type: itemType,
						userId: +userId,
						modId: mod.id
					}
				});
			}
			return json(wrapData(item));
		}
		return json(null);
	} catch (error) {
		return json(null);
	}
};

export const GET = async ({ request }) => {
	const userId = request.headers.get('User-Id');
	console.log(`user id ${userId} found`);
	if (userId) {
		const items = await db.item.findMany({ where: { userId: +userId } });
		return json(wrapData(items));
	}
	return json(null);
};
