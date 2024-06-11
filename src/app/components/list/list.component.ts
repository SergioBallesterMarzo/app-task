import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../service/tasks.service';
import { Task } from './../../interface/task';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskStateService } from 'src/app/service/task-state.service';
import { finalize } from 'rxjs';
import { Status } from '../../interface/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public tasks: Task[] = [];
  selectedStatus: 'Pendiente' | 'En proceso' | 'Completada' = 'Pendiente'; // Valor inicial



  constructor(
    public tasksService: TasksService,
    private taskStateService: TaskStateService,
    private router: Router,
    private MatSnackBar: MatSnackBar
    ){}

  ngOnInit(): void {
    this.tasksService.getAllTasks$()
    .subscribe(tasks =>{
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
    const snackbar = this.MatSnackBar.open("¿Estás seguro de que deseas eliminar esta tarea?", "Sí");
    snackbar.onAction().subscribe(() => {
        this.tasksService.deleteTask$(id).subscribe(
            () => {
                this.MatSnackBar.open("¡Tarea eliminada correctamente!", "Cerrar");
                this.tasksService.getAllTasks$().subscribe(
                    (updatedTasks) => {
                        this.tasks = updatedTasks;
                    },
                );
            },
            (error) => {
                this.MatSnackBar.open("Error al eliminar la tarea: " + error.message, "Cerrar");
            }
        );
    });
}

}
