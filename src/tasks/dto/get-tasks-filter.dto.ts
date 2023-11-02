import { IsOptional, IsIn, IsEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class getTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsEmpty()
  search: string;
}
