import { PrismaClient } from '@prisma/client';
import student from '../student/student.mjs';

async function main() {
  const prisma = new PrismaClient();
  await prisma.student.upsert({
    where: {
      email: student.email,
    },
    create: student,
    update: student,
  });
}

main();
