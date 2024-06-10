import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Task } from '../interface/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {
  private readonly URL = environment.api;
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
  }

  get tasks$(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  updateTaskStatus(task: Task): Observable<Task[]> {
    return this.http.put<Task[]>(`${this.URL}/tasks/${task.id}`, task).pipe(
      catchError((error) => {
        console.error('Error updating task status:', error);
        return [];
      }),
    );
  }

}
