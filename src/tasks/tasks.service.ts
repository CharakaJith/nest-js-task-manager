import { Injectable } from '@nestjs/common';
import * as DisplayIdGenerator from '../common/displayId.generator';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const taskId = await DisplayIdGenerator.DISPLAY_ID_TASK();

    const newTask: Task = {
      id: taskId,
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    return this.tasks.find((task) => {
      return task.id === id;
    });
  }

  async deleteTaskById(id: string): Promise<string> {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id;
    });

    return 'Task deleted successfully!';
  }
}
