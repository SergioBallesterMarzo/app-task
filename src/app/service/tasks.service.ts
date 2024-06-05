import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private URL = environment.api

  constructor( private http: HttpClient) {
  }

  getAllTasks$(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.URL}/tasks`)
  }

  createTask$(task: Task): Observable<Task[]>{
    return this.http.post<Task[]>(`${this.URL}/tasks`, task)
  }

}
