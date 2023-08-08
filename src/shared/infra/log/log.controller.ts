import { ApiAccessToken } from '@/modules/auth/decorators/api-access-token.decorator';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LogService } from './log.service';
import { JWTGuard } from '@/modules/auth/guards/jwt.guard';
import { ListLogsDTO } from './dtos/list-logs.dto';
import { User } from '@/modules/auth/decorators/user.decorator';
import { toLogDTO } from './mappers/log.mapper';
import { ApiOkPaginatedResponse } from '@/shared/decorators/api-ok-paginated-response.decorator';
import { LogDTO } from './dtos/log.dto';
import { LogAction } from './decorators/log-action.decorator';
import { LogActions } from './log-actions.enum';
import { ApiInternalServerErrorResponse } from '@/shared/decorators/api-internal-server-error-response.decorator';

@ApiTags('LOG')
@ApiAccessToken()
@UseGuards(JWTGuard)
@ApiBadRequestResponse({
  description: 'Invalid query parameters',
})
@ApiUnauthorizedResponse({
  description: 'Invalid or missing access token',
})
@ApiInternalServerErrorResponse()
@Controller('log')
export class LogController {
  constructor(private logService: LogService) {}

  @ApiOperation({
    summary: 'List logs',
    description: 'List user logs filtered by date range',
  })
  @LogAction(LogActions.LOG_LIST)
  @ApiOkPaginatedResponse(LogDTO)
  @Get()
  public async listLogs(
    @Query() listLogsDto: ListLogsDTO,
    @User('sub') userId: string,
  ) {
    const { data, meta } = await this.logService.listLogs({
      ...listLogsDto,
      userId,
    });

    return {
      meta,
      data: data.map(toLogDTO),
    };
  }
}
