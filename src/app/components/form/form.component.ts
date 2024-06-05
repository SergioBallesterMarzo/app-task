import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, Status } from 'src/app/interface/task';
import { TasksService } from 'src/app/service/tasks.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public tasks: Task[] = [];
  public formulario!: FormGroup;

  task: Task = {
    status:'Pendiente' ,
    name: '',
    employee: ''
  };

  constructor(
    private taskService: TasksService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name:     ['', [Validators.required, Validators.minLength(3)]],
      employee: ['', [Validators.required,Validators.minLength(3)]],
      status:   [ '' ,[ Validators.required]]
    });
  }

  guardar() {
    if (this.formulario.valid) {
      // Si el formulario es válido, envía la tarea al servicio
      this.taskService.createTask$(this.formulario.value).subscribe(
        (response) => {
          console.log('Tarea creada:', response);
        },
        (error) => {
          console.error('Error al crear la tarea:', error);
        }
      );
    } else {
      console.log('El formulario no es válido. Verifica los campos.');
    }
  }
}
