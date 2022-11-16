import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodo() {
    const todo = await this.todoService.getTodoList();
    return todo;
  }

  @Get(':id')
  async getSingleTodo(@Param('id') todoId: string) {
    return this.todoService.getSingleTodo(todoId);
  }

  @Post()
  async addTodo(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
  ) {
    const todo = await this.todoService.addTodoItem(title, description, status);
    return { todo: todo };
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') todoId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
  ) {
    const todo = await this.todoService.updateTodo(
      todoId,
      title,
      description,
      status,
    );
    return todo;
  }

  @Delete(':id')
  async deleteTodo(@Param('id') todoId: string) {
    await this.todoService.deleteTodo(todoId);
    return { message: 'Todo Item Deleted' };
  }
}
