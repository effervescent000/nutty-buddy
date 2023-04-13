import { db } from '../../db.server';
import { wrapData } from '../../utils/general-utils';

export const load = async ({ cookies }) => {
	const userId = cookies.get('userId');
	if (userId) {
		const items = await db.item.findMany({ where: { userId: +userId } });
		return wrapData(items);
	}
};
