import { db } from '../../db.server.js';
import { getNumericUserIdFromCookies } from '../../utils/api-utils.js';
import {
	coerceFormDataEntryToNumber,
	wrapData
} from '../../utils/general-utils.js';

export const load = async ({ cookies }) => {
	const userId = getNumericUserIdFromCookies(cookies);
	if (userId !== undefined) {
		const mods = await db.mod.findMany({ where: { userId } });
		return wrapData(mods);
	}
	return wrapData([]);
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const userId = cookies.get('userId');
		const itemName = data.get('item-name')?.toString();
		const itemType = data.get('item-type')?.toString();
		const mod = {
			name: data.get('mod-name')?.toString(),
			id: coerceFormDataEntryToNumber(data.get('mod-id'))
		};

		if (userId) {
			if (itemName && itemType) {
				const item = await db.item.create({
					data: {
						name: itemName,
						type: itemType,
						user: {
							connect: { id: +userId }
						},
						mod: mod.name
							? {
									connectOrCreate: {
										where: {
											id: mod.id
										},
										create: {
											name: mod.name,
											user: {
												connect: { id: +userId }
											}
										}
									}
							  }
							: undefined
					}
				});
				return wrapData(item);
			}
		}
	}
};
