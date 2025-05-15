import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Todo } from './todo.type';
import { CreateTodo } from './dto/create-todo';
import { TodoService } from './todo.service';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  CreateTodo(@Body() createTodo: CreateTodo) {
    const newTodo = this.todoService.create(createTodo);
    return newTodo;
  }

  @UseGuards(AuthGuard)
  @Get()
  GetAllTodo() {
    return this.todoService.getAll();
  }

  @Get(':id')
  getOneTodo(@Param('id') id: string) {
    let todo = this.todoService.getOneTodo(id);
    return todo;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createTodo: CreateTodo) {
    const Todos = this.todoService.updateTodo(id, createTodo);
    return Todos;
  }

  @Delete(':id')
  DeleteTodo(@Param('id') id: string) {
    const todos = this.todoService.DeleteTodo(id);
    return todos;
  }
}
