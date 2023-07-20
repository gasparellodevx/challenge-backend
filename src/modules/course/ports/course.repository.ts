import { Course } from '@prisma/client';
import { ListCoursesDTO } from '../dtos/list-courses.dto';
import { PaginatedDTO } from '@/shared/dtos/paginated.dto';
import { Either } from '@/shared/types/either';
import { CourseNotFoundError } from '../errors/course-not-found.error';
import { CreateCouseDTO } from '../dtos/create-course.dto';
import { UpdateCouseDTO } from '../dtos/update-course.dto';

type StudentID = { studentId?: string };

export abstract class ICourseRepository {
  abstract listCourses(
    listDto: ListCoursesDTO & StudentID,
  ): Promise<PaginatedDTO<Course>>;

  abstract findCourseById(
    options: { id: string } & Required<StudentID>,
  ): Promise<Either<CourseNotFoundError, Course>>;

  abstract createCourse(
    createCourseDto: CreateCouseDTO & Required<StudentID>,
  ): Promise<Course>;

  abstract updateCourse(
    options: {
      id: string;
      updateCourseDto: UpdateCouseDTO;
    } & Required<StudentID>,
  ): Promise<Either<CourseNotFoundError, Course>>;

  abstract deleteCourse(
    options: { id: string } & Required<StudentID>,
  ): Promise<Either<CourseNotFoundError, Course>>;
}
