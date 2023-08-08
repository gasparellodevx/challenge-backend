import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { StudentService } from './student.service';
import { baseErrorToHttpException } from '@/shared/errors/utils/base-error-to-http-exception';
import { toStudentDTO } from './mappers/student.mapper';
import { UpdateStudentDTO } from './dtos/update-student.dto';
import { StudentDTO } from './dtos/student.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { TokenPayload } from '../auth/auth.service';
import { User } from '../auth/decorators/user.decorator';
import { ApiAccessToken } from '../auth/decorators/api-access-token.decorator';
import { ApiInternalServerErrorResponse } from '@/shared/decorators/api-internal-server-error-response.decorator';
import { LogAction } from '@/shared/infra/log/decorators/log-action.decorator';
import { LogActions } from '@/shared/infra/log/log-actions.enum';
import { InvalidateUserCache } from '@/shared/infra/cache/decorators/invalidate-user-cache.decorator';

@ApiInternalServerErrorResponse()
@ApiBadRequestResponse({
  description: 'Invalid request body, query parameters or path parameters',
})
@ApiTags('STUDENTS')
@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @LogAction(LogActions.STUDENT_CREATE)
  @ApiOperation({
    summary: 'Create a student',
    description: 'Create a student with the given data',
  })
  @Post()
  public async createStudent(
    @Body() createDto: CreateStudentDTO,
  ): Promise<StudentDTO> {
    const result = await this.studentService.createStudent(createDto);

    if (result.isLeft()) throw baseErrorToHttpException(result.value);

    return toStudentDTO(result.value);
  }

  @InvalidateUserCache()
  @LogAction(LogActions.STUDENT_UPDATE)
  @UseGuards(JWTGuard)
  @ApiAccessToken()
  @ApiOperation({
    summary: 'Update a student',
    description: 'Update a student with the given data',
  })
  @ApiUnauthorizedResponse()
  @Patch()
  public async updateStudent(
    @User('sub') id: TokenPayload['sub'],
    @Body() updateDto: UpdateStudentDTO,
  ): Promise<StudentDTO> {
    const result = await this.studentService.updateStudent(id, updateDto);

    if (result.isLeft()) throw baseErrorToHttpException(result.value);

    return toStudentDTO(result.value);
  }
}
