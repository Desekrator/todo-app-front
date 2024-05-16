import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../config/config';
import { TaskModel } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = config;


  constructor(
    private readonly http: HttpClient
  ) { }

  public addTask(todo: TaskModel) {

    return this.http.post<TaskModel[]>(this.baseUrl + 'addTask', todo);
  }

  public editTask(todo: TaskModel) {

    return this.http.post<TaskModel[]>(this.baseUrl + 'editTask', todo);

  }

  public removeTask(todoId: string | number) {

    return this.http.delete(this.baseUrl + 'task/' + todoId, { responseType: 'text' });
  }

  public getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.baseUrl + 'task');
  }
}
