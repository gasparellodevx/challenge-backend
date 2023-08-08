import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ListCoursesDTO } from './dtos/list-courses.dto';
import { PaginatedDTO } from '@/shared/dtos/paginated.dto';
import { CourseService } from './course.service';
import { CreateCouseDTO } from './dtos/create-course.dto';
import { IdDTO } from '@/shared/dtos/id.dto';
import { UpdateCouseDTO } from './dtos/update-course.dto';
import { baseErrorToHttpException } from '@/shared/errors/utils/base-error-to-http-exception';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { User } from '../auth/decorators/user.decorator';
import { ApiAccessToken } from '../auth/decorators/api-access-token.decorator';
import { ApiOkPaginatedResponse } from '@/shared/decorators/api-ok-paginated-response.decorator';
import { CourseDTO } from './dtos/course.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiInternalServerErrorResponse } from '@/shared/decorators/api-internal-server-error-response.decorator';
import { LogAction } from '@/shared/infra/log/decorators/log-action.decorator';
import { LogActions } from '@/shared/infra/log/log-actions.enum';
import { CacheTTL } from '@nestjs/cache-manager';
import { InvalidateUserCache } from '@/shared/infra/cache/decorators/invalidate-user-cache.decorator';

@ApiTags('COURSES')
@ApiAccessToken()
@ApiInternalServerErrorResponse()
@ApiBadRequestResponse({
  description: 'Invalid request body, query parameters or path parameters',
})
@ApiUnauthorizedResponse({
  description: 'Invalid or missing access token',
})
@UseGuards(JWTGuard)
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @CacheTTL(15)
  @LogAction(LogActions.COURSE_LIST)
  @ApiOperation({
    summary: 'List courses',
    description: 'List student courses',
  })
  @ApiOkPaginatedResponse(CourseDTO)
  @Get()
  public async listCourses(
    @User('sub') studentId: string,
    @Query() listDto: ListCoursesDTO,
  ): Promise<PaginatedDTO<CourseDTO>> {
    return await this.courseService.listCoursesByStudentId({
      studentId,
      listDto,
    });
  }

  @InvalidateUserCache()
  @LogAction(LogActions.COURSE_CREATE)
  @ApiOperation({
    summary: 'Create a course',
    description: 'Create a course with the given data',
  })
  @Post()
  public async createCourse(
    @User('sub') studentId: string,
    @Body() createCourseDto: CreateCouseDTO,
  ): Promise<CourseDTO> {
    return await this.courseService.createCourse({
      createCourseDto,
      studentId,
    });
  }

  @InvalidateUserCache()
  @LogAction(LogActions.COURSE_UPDATE)
  @ApiOperation({
    summary: 'Update a course',
    description: 'Update a course with the given id and data',
  })
  @Patch(':id')
  public async updateCourse(
    @User('sub') studentId: string,
    @Param() { id }: IdDTO,
    @Body() updateCourseDto: UpdateCouseDTO,
  ): Promise<CourseDTO> {
    const result = await this.courseService.updateCourse({
      id,
      updateCourseDto,
      studentId,
    });

    if (result.isLeft()) throw baseErrorToHttpException(result.value);

    return result.value;
  }

  @InvalidateUserCache()
  @LogAction(LogActions.COURSE_DELETE)
  @ApiOperation({
    summary: 'Delete a course',
    description: 'Delete a course with the given id',
  })
  @Delete(':id')
  public async deleteCourse(
    @User('sub') studentId: string,
    @Param() { id }: IdDTO,
  ): Promise<CourseDTO> {
    const result = await this.courseService.deleteCourse({ id, studentId });

    if (result.isLeft()) throw baseErrorToHttpException(result.value);

    return result.value;
  }
}
