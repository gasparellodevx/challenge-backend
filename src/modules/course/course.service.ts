import { Injectable } from '@nestjs/common';
import { ICourseRepository } from './ports/course.repository';
import { ListCoursesDTO } from './dtos/list-courses.dto';
import { CreateCouseDTO } from './dtos/create-course.dto';
import { UpdateCouseDTO } from './dtos/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private courseRepository: ICourseRepository) {}

  public async listCourses(listDto: ListCoursesDTO) {
    return await this.courseRepository.listCourses(listDto);
  }

  public async findCourseById(options: { id: string; studentId: string }) {
    return await this.courseRepository.findCourseById(options);
  }

  public async createCourse({
    createCourseDto,
    studentId,
  }: {
    createCourseDto: CreateCouseDTO;
    studentId: string;
  }) {
    return await this.courseRepository.createCourse({
      ...createCourseDto,
      studentId,
    });
  }

  public async updateCourse({
    id,
    updateCourseDto,
    studentId,
  }: {
    id: string;
    updateCourseDto: UpdateCouseDTO;
    studentId: string;
  }) {
    return await this.courseRepository.updateCourse({
      id,
      updateCourseDto,
      studentId,
    });
  }

  public async listCoursesByStudentId({
    listDto,
    studentId,
  }: {
    studentId: string;
    listDto: ListCoursesDTO;
  }) {
    return await this.courseRepository.listCourses({ ...listDto, studentId });
  }

  public async deleteCourse(options: { id: string; studentId: string }) {
    return await this.courseRepository.deleteCourse(options);
  }
}
