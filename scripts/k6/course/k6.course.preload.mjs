import { PrismaClient } from '@prisma/client';
import student from '../student/student.mjs';

const COURSE_QUANTITY = 1000;

async function main() {
  const prisma = new PrismaClient();
  const foundStudent = await prisma.student.upsert({
    where: {
      email: student.email,
    },
    create: student,
    update: student,
  });

  await prisma.course.deleteMany({
    where: {
      studentId: foundStudent.id,
    },
  });

  let courses = [];

  for (let i = 0; i < COURSE_QUANTITY; i++) {
    courses.push({
      name: `K6 Load Testing ${i}`,
      accessUrl: `https://k6.io/docs/`,
      category: 'load-testing',
      description: 'K6 Load Testing',
      supportUrl: `https://k6.io/docs/`,
      type: 'EXTERNAL_LINK',
      studentId: foundStudent.id,
    });
  }

  await prisma.course.createMany({
    data: courses,
  });
}

main();
