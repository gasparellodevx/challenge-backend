import { Injectable } from '@nestjs/common';
import { ILogRepository } from '../ports/log.repository';
import { ListLogsDTO } from '../dtos/list-logs.dto';
import { Log, Prisma } from '@prisma/client';
import { PrismaService } from '../../db/prisma.service';
import { PaginatedDTO } from '@/shared/dtos/paginated.dto';

@Injectable()
export class LogPrismaRepository implements ILogRepository {
  constructor(private prisma: PrismaService) {}

  public async createLog(data: Omit<Log, 'id'>): Promise<Log> {
    return await this.prisma.log.create({
      data,
    });
  }

  public async listLogs(listLogsDto: ListLogsDTO): Promise<PaginatedDTO<Log>> {
    const { page = 1, limit = 10, ...dto } = listLogsDto;

    const where: Prisma.LogWhereInput = {
      executedAt: {
        gte: dto.since,
        lt: dto.until,
      },
      userId: dto.userId,
    };

    const [totalCount, logs] = await Promise.all([
      this.prisma.log.count({ where }),
      this.prisma.log.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          executedAt: 'desc',
        },
      }),
    ]);

    return {
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      data: logs,
    };
  }
}
