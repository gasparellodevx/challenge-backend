import { Log } from '@prisma/client';
import { ListLogsDTO } from '../dtos/list-logs.dto';
import { PaginatedDTO } from '@/shared/dtos/paginated.dto';

export abstract class ILogRepository {
  abstract createLog(data: Omit<Log, 'id'>): Promise<Log>;
  abstract listLogs(listLogsDto: ListLogsDTO): Promise<PaginatedDTO<Log>>;
}
