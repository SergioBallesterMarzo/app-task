import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
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
    return this.http.get<Task[]>(`${this.URL}/tasks`).pipe(
      delay(1500))
  }

  getTaskById$(id: string): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.URL}/tasks/${id}`)
  }

  createTask$(task: Task): Observable<Task[]>{
    return this.http.post<Task[]>(`${this.URL}/tasks`, task)
  }

  updateTask$(task: Task): Observable<Task[]>{
    if ( !task.id) throw Error ('Id es necsaria');
    return this.http.patch<Task[]>(`${this.URL}/tasks/${task.id}`, task)
  }


  deleteTask$(id: string): Observable<boolean>{
    return this.http.delete(`${this.URL}/tasks/${id}`)
    .pipe(
      map(() => true),
    );
  }

}
