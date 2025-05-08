import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.type';
import { log } from 'console';

// instance of class single tone

@Injectable()
export class TodoService {
  todo: Todo[] = [];
  counter = 1;

  create({ title }): Todo {
    let newTodo = { id: this.counter++, title: title, isCompleted: false };
    this.todo.push(newTodo);
    return newTodo;
  }

  getAll(): Todo[] {
    return this.todo;
  }

  getOneTodo(id: string) {
    const Todo = this.todo.find((todo) => todo.id === +id);
    if (!Todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return Todo;
  }

  updateTodo(id: string, { title }): Todo[] {
    const check = this.todo.find((todo) => todo.id === +id);
    if (!check) {
      throw new NotFoundException(`Todo ${id} not found`);
    }

    const newTodo = this.todo.map((todo) =>
      todo.id === +id ? { ...todo, title } : todo,
    );
    this.todo = [...newTodo];
    // Object.assign(todo, updateDto);
    return this.todo;
  }

  DeleteTodo(id: string): Todo[] {
    const check = this.todo.find((todo) => todo.id === +id); // 1 item 
    if (check) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    const newTodo = this.todo.filter((todo) => todo.id !== +id);
        // delete by splice
    console.log(newTodo);
    this.todo = [...newTodo];
    return this.todo;
  }

}
