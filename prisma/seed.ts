import { PrismaClient } from '.prisma/client/index.js';

const prisma = new PrismaClient();

const main = async () => {
	const user = await prisma.user.create({ data: { name: 'test user' } });
	const item = await prisma.item.create({
		data: {
			name: 'a test item',
			type: 'item',
			user: {
				connect: {
					id: user.id
				}
			}
		}
	});
	const method = await prisma.method.create({
		data: {
			name: 'test method',
			user: { connect: { id: user.id } }
		}
	});
	const req = await prisma.requirement.create({
		data: {
			name: 'test req',
			completed: false,
			user: { connect: { id: user.id } }
		}
	});
	console.log({ user, item, method, req });
};
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);

		await prisma.$disconnect();

		process.exit(1);
	});
