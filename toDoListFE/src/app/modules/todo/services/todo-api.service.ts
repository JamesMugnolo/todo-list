import { Injectable } from '@angular/core';
import { IToDo } from '../components/todo-display/todo';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  wasSuccessful: boolean;
  resultingToDos: IToDo[];
  id: number;
  baseUrl: string = `${environment.API_BASE_URL}/api/todos`;
  constructor(private http: HttpClient) {
    this.wasSuccessful = false;
    this.resultingToDos = [];
    this.id = -1;
  }

  post(username: Observable<string>, todo: IToDo): Object {
    const httpHeaders = new HttpHeaders({ observe: 'response' });
    return username.pipe(
      switchMap((username: string) =>
        this.http.post(`${this.baseUrl}/${username}`, todo, {
          headers: httpHeaders,
        })
      )
    );
  }

  fetchAll(username: Observable<string>) {
    let headers = new HttpHeaders({});
    return username.pipe(
      switchMap((username: string) =>
        this.http.get<IToDo[]>(`${this.baseUrl}/${username}`)
      )
    );
  }

  delete(username: Observable<string>, id: number): Object {
    this.wasSuccessful;
    const httpHeaders = new HttpHeaders({ observe: 'response' });
    return username.pipe(
      switchMap((username: string) =>
        this.http.delete(`${this.baseUrl}/${id}/user/${username}`, {
          headers: httpHeaders,
        })
      )
    );
  }
  update(username: Observable<string>, todo: IToDo): Object {
    const httpHeaders = new HttpHeaders({ observe: 'response' });

    return username.pipe(
      switchMap((username: string) =>
        this.http.put(`${this.baseUrl}/${todo.id}/user/${username}`, todo, {
          headers: httpHeaders,
        })
      )
    );
  }
}
