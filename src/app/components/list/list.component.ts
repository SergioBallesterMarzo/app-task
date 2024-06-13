import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../service/tasks.service';
import { Task } from './../../interface/task';
import { Router } from '@angular/router';
import { TaskStateService } from 'src/app/service/task-state.service';
import { Status } from '../../interface/task';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public tasks: Task[] = [];
  selectedStatus: 'Pendiente' | 'En proceso' | 'Completada' = 'Pendiente'; // Valor inicial
  public loading: boolean = true;


  constructor(
    public tasksService: TasksService,
    private taskStateService: TaskStateService,
    private router: Router,
    private dialog: MatDialog
    ){}

  ngOnInit(): void {
    this.tasksService.getAllTasks$()
    .subscribe(tasks =>{
      this.loading = false;
      this.tasks = tasks
    })
    this.taskStateService.tasks$.subscribe((tasks) => {

      this.tasks = tasks;
    });
  }

  cambiarEstado(statusActual: Status): Status {
    switch (statusActual) {
        case "Pendiente":
            return "En proceso";
        case "En proceso":
            return "Completada";
        case "Completada":
            return "Completada";

    }
  }


  changetask(task: Task) {
    const changeEstatus = this.cambiarEstado(task.status)
    const change: Task = {...task, status: changeEstatus}
    this.taskStateService.updateTaskStatus(change).subscribe(
      () => {
        this.tasksService.getAllTasks$().subscribe(
          (updatedTasks) => {
            this.tasks = updatedTasks;
          },
          (error) => {
            console.error("Error al obtener las tareas actualizadas:", error);
          }
        );
      },
    );
  }


  onDeleteTask(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '¿Estás seguro de que deseas eliminar esta tarea?', // Personaliza el mensaje de confirmación
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // El usuario confirmó la eliminación
        this.tasksService.deleteTask$(id).subscribe(() => {
          this.tasksService.getAllTasks$().subscribe((updatedTasks) => {
            this.tasks = updatedTasks;
          });
        });
      }
    });
  }
}
