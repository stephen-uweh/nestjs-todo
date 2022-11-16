/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './todo.model';

@Injectable()
export class TodoService{
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async addTodoItem(title: string, description: string, status: string) {
    const newItem = new this.todoModel({
      title,
      description,
      status,
    });

    const item = await newItem.save();
    return item;
  }

  async getTodoList() {
    const todo = await this.todoModel.find().exec();
    return todo.map((list) => ({
      id: list.id,
      title: list.title,
      description: list.description,
      status: list.status,
    }));
  }

  async getSingleTodo(todoId: string){
    const todo = await this.findTodo(todoId);
    return {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status
    }
  }

  async updateTodo(
    todoId: string,
    title: string,
    description: string,
    status: string
  ){
    const todo = await this.findTodo(todoId);

    if(title){
        todo.title = title
    }
    if (description){
        todo.description = description
    }
    if(status){
        todo.status = status
    }
    todo.save();
    return todo;
  }

  async deleteTodo(todoId: string){
    await this.todoModel.deleteOne({_id:todoId}).exec();
    return null
  }

  private async findTodo(id: string): Promise<Todo> {
    let todo;
    try {
      todo = await this.todoModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Todo.');
    }
    if (!todo) {
      throw new NotFoundException('Could not find Todo.');
    }
    return todo;
  }
}
