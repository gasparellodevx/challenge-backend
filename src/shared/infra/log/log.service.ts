import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import type { Logger } from 'winston';
import type { Log } from '@prisma/client';
import { InjectLogger } from './decorators/inject-logger.decorator';
import { ILogRepository } from './ports/log.repository';
import { PaginatedDTO } from '@/shared/dtos/paginated.dto';
import { ListLogsDTO } from './dtos/list-logs.dto';

@Injectable()
export class LogService {
  constructor(
    private logRepository: ILogRepository,
    @InjectLogger() private logger: Logger,
  ) {}

  public async createLog(log: Omit<Log, 'executedAt' | 'id'>) {
    const executedAt = new Date();

    await this.logRepository.createLog({
      ...log,
      executedAt,
    });

    this.logger.info({
      executedAt,
      ...log,
    });
  }

  public async listLogs(listLogsDto: ListLogsDTO): Promise<PaginatedDTO<Log>> {
    return await this.logRepository.listLogs(listLogsDto);
  }
}
