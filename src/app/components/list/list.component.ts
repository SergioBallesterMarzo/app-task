import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../service/tasks.service';
import { Task } from './../../interface/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public tasks: Task[] = [];

  constructor(public tasksService: TasksService){}

  ngOnInit(): void {
    this.tasksService.getAllTasks$()
    .subscribe(tasks =>{
      this.tasks = tasks
    })
  }

}
