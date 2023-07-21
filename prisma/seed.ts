import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  await prisma.student.deleteMany();

  const promises = [];

  for (let i = 0; i < 40; i++) {
    promises.push(
      prisma.student.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          lastAccess: faker.date.past(),
        },
      }),
    )
  }
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
