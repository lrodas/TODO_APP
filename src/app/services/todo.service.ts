import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { StorageService } from './storage.service';
import { AlertService } from './Alert.service';
import { Todo } from '@models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly storage: StorageService = inject(StorageService);
  private readonly alert: AlertService = inject(AlertService);

  constructor() { }

  public retrieveTodos(): Todo[] {
    const todos = this.storage.getItem<Todo[]>('todos');
    if (todos) {
      return todos;
    }
    return [];
  }

  public addTodo(todo: Todo): void {
    const todos = this.retrieveTodos();
    if (!todo.id) {
      todo.id = uuidv4();
      todo.completed = false;
      todo.createdAt = new Date();
    }
    todos.push(todo);
    this.storage.setItem('todos', todos);
    this.alert.showSuccess('Tarea agregada!');
  }

  public updateTodo(updatedTodo: Todo): void {
    const todos = this.retrieveTodos();
    const index = todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      updatedTodo.updatedAt = new Date();
      updatedTodo.completed = updatedTodo.completed || false;
      todos[index] = updatedTodo;
      this.storage.setItem('todos', todos);
      this.alert.showSuccess('Tarea actualizada!');
    } else {
      this.alert.showError('Tarea no encontrada!');
    }
  }

  public deleteTodo(todoId: string): void {
    let todos = this.retrieveTodos();
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      todos.splice(index, 1);
      this.storage.setItem('todos', todos);
      this.alert.showSuccess('Tarea eliminada!');
    } else {
      this.alert.showError('Tarea no encontrada!');
    }
  }

  public clearCompletedTodos(): void {
    let todos = this.retrieveTodos();
    todos = todos.filter(todo => !todo.completed);
    this.storage.setItem('todos', todos);
    this.alert.showSuccess('Tareas completadas eliminadas!');
  }

}
