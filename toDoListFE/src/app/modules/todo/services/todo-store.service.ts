import { Injectable } from '@angular/core';
import { IToDo } from '../components/todo-display/todo';
import { TodoApiService } from './todo-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { findIndex, mergeMap, take, tap } from 'rxjs/operators';
import { UserStoreService } from '../../login/services/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStoreService {
  getTodos(): Observable<IToDo[]> {
    return this.todos;
  }
  private defaultToDo: IToDo = {
    id: -1,
    userid: -1,
    title: '',
    description: '',
    completeBy: new Date(),
    status: 'IN_PROGRESS',
  };

  private todolist = new BehaviorSubject<IToDo[]>([]);
  todos: Observable<IToDo[]> = this.todolist.asObservable();

  private editableTodo = new BehaviorSubject<IToDo>(this.defaultToDo);
  todo: Observable<IToDo> = this.editableTodo.asObservable();

  constructor(
    private todoAPi: TodoApiService,
    private userStore: UserStoreService
  ) {}

  addAToDo(todo: IToDo) {
    const response: any = this.todoAPi.post(this.userStore.getUsername(), todo);
    response
      .pipe(
        mergeMap((result: any) => {
          todo['id'] = result;
          return this.todolist;
        }),
        take(1)
      )
      .subscribe((todos: IToDo[]) => {
        this.todolist.next([...todos, todo]);
      });
  }

  fetchAllToDos() {
    const todosString = localStorage.getItem('app.todos');
    if (todosString) {
      this.todolist.next(JSON.parse(todosString));
    } else {
      const response: any = this.todoAPi.fetchAll(this.userStore.getUsername());

      response.pipe(take(1)).subscribe((todos: IToDo[]) => {
        this.todolist.next(todos);
        localStorage.setItem('app.todos', JSON.stringify(todos));
      });
    }
    return this.todos;
  }
  delete(id: number) {
    const response: any = this.todoAPi.delete(this.userStore.getUsername(), id);
    response
      .pipe(
        mergeMap((result: any) => {
          return this.todolist;
        }),
        take(1)
      )
      .subscribe((todos: IToDo[]) => {
        const newTodos = todos.filter((todo) => {
          return todo.id != id;
        });
        this.todolist.next(newTodos);
        localStorage.setItem('app.todos', JSON.stringify(newTodos));
      });
  }
  update(todo: IToDo) {
    const response: any = this.todoAPi.update(
      this.userStore.getUsername(),
      todo
    );

    response
      .pipe(
        mergeMap((result) => {
          return this.todolist;
        }),
        take(1)
      )
      .subscribe((todos: IToDo[]) => {
        const index = todos.findIndex((item) => {
          return item.id == todo.id;
        });
        todos[index] = todo;
        this.todolist.next(todos);
        localStorage.setItem('app.todos', JSON.stringify(todos));
      });
  }

  saveSingleToDo(todo?: IToDo) {
    if (todo == undefined) {
      this.editableTodo.next({ ...this.defaultToDo });
    } else {
      this.editableTodo.next(todo);
    }
  }
  fetchSingleToDo() {
    return this.todo;
  }
}
