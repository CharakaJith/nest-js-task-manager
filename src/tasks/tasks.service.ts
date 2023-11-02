import { Injectable, NotFoundException } from '@nestjs/common';
import * as DisplayIdGenerator from '../common/displayId.generator';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';

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

  async getTasksWithFilters(filterDto: getTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    let tasks = await this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => {
        return task.status === status;
      });
    }

    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = this.tasks.find((task) => {
      return task.id === id;
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }

    return task;
  }

  async deleteTaskById(id: string): Promise<string> {
    const task = await this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => {
      return task.id !== task.id;
    });

    return 'Task deleted successfully!';
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    return task;
  }
}
