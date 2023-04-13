export const load = ({ cookies }) => {
	return { userId: cookies.get('userId') };
};
