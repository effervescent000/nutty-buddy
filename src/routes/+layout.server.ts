export const load = async ({ cookies }) => {
	return { userId: cookies.get('userId') };
};
