import { PartialType } from '@nestjs/swagger';
import { CreateCouseDTO } from './create-course.dto';

export class UpdateCouseDTO extends PartialType(CreateCouseDTO) {}
