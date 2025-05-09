import { Injectable, NotFoundException } from '@nestjs/common';
import { log } from 'console';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schema/schema';
import { CreateTodo } from './dto/create-todo';

@Injectable()
export class TodoService {
 
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>){} //???

  create(createTodo : CreateTodo) {
    return this.todoModel.create(createTodo);
  }

  getAll() {
    return this.todoModel.find();
  }

  getOneTodo(id: string) {
    const Todo = this.todoModel.findById(id);
    if (!Todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return Todo;
  }

  updateTodo(id: string, updatedDto: CreateTodo) {
    const check = this.todoModel.findById(id);
    if (!check) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return this.todoModel.updateOne({_id: id}, updatedDto);
  }

  DeleteTodo(id: string) {
    const check = this.todoModel.findById(id);
    if (!check) {
      throw new NotFoundException(`Todo ${id} not found`);
    }

    return this.todoModel.deleteOne({_id: id});
  }

}
