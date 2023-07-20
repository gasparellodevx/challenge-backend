import { Injectable } from '@nestjs/common';
import { ICourseRepository } from '../ports/course.repository';
import { PaginatedDTO } from '@/shared/dtos/paginated.dto';
import { left, type Either, right } from '@/shared/types/either';
import { type Course } from '@prisma/client';
import { CreateCouseDTO } from '../dtos/create-course.dto';
import { ListCoursesDTO } from '../dtos/list-courses.dto';
import { UpdateCouseDTO } from '../dtos/update-course.dto';
import { CourseNotFoundError } from '../errors/course-not-found.error';
import { PrismaService } from '@/shared/infra/db/prisma.service';

@Injectable()
export class CoursePrismaRepository implements ICourseRepository {
  constructor(private prisma: PrismaService) {}

  public async listCourses(
    listDto: ListCoursesDTO & { studentId?: string },
  ): Promise<PaginatedDTO<Course>> {
    const { page = 1, limit = 10, studentId } = listDto;

    const options = {
      ...(studentId && { where: { studentId } }),
      skip: (page - 1) * limit,
      take: limit,
    };

    const [totalCount, data] = await Promise.all([
      this.prisma.course.count(options),
      this.prisma.course.findMany(options),
    ]);

    return {
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        page,
        limit,
      },
      data,
    };
  }

  public async findCourseById({
    id,
    studentId,
  }: {
    id: string;
    studentId: string;
  }): Promise<Either<CourseNotFoundError, Course>> {
    const course = await this.prisma.course.findUnique({
      where: { id, studentId },
    });

    if (!course) return left(new CourseNotFoundError(id));

    return right(course);
  }

  public async createCourse(
    createCourseDto: CreateCouseDTO & { studentId: string },
  ): Promise<Course> {
    return await this.prisma.course.create({ data: createCourseDto });
  }

  public async updateCourse({
    id,
    studentId,
    updateCourseDto,
  }: {
    id: string;
    updateCourseDto: UpdateCouseDTO;
    studentId: string;
  }): Promise<Either<CourseNotFoundError, Course>> {
    const course = await this.prisma.course.update({
      where: { id, studentId },
      data: updateCourseDto,
    });

    if (!course) return left(new CourseNotFoundError(id));

    return right(course);
  }

  public async deleteCourse(options: {
    id: string;
    studentId: string;
  }): Promise<Either<CourseNotFoundError, Course>> {
    const course = await this.prisma.course.delete({ where: options });

    if (!course) return left(new CourseNotFoundError(options.id));

    return right(course);
  }
}
