import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task} from 'src/app/interface/task';
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
    id:'',
    status:'Pendiente' ,
    name: '',
    employee: ''
  };

  constructor(
    private taskService: TasksService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name:     ['', [Validators.required, Validators.minLength(3)]],
      employee: ['', [Validators.required,Validators.minLength(3)]],
      status:   [ '' ,[ Validators.required]]
    });
  }

  addTask() {
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
    this.showSnackbar('Tarea creada', 'Cerrar');
    this.router.navigate(['/home']);
  }


  isValidField(field: string): boolean | null{
    return this.formulario.controls[field].errors
    && this.formulario.controls[field].touched;
  }

  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duración en milisegundos (opcional)
    });
  }
  returntask(){
    this.router.navigate(['/home']);
  }

  isEditRoute(): boolean {
    // Aquí debes implementar la lógica para verificar si estás en la ruta de edición
    // Por ejemplo, si la ruta contiene '/edit', devuelve true; de lo contrario, devuelve false.
    return this.route.snapshot.url.some(segment => segment.path === 'edit');
  }
  saveTask() {
    if (this.formulario.valid) {
      const updatedTask: Task = this.formulario.value; // Obtén los datos modificados
      // Lógica para guardar los cambios (por ejemplo, mediante un servicio)
      // Implementa tu lógica aquí
      console.log('Tarea modificada:', updatedTask);
    } else {
      console.log('El formulario no es válido. Verifica los campos.');
    }
    this.router.navigate(['/home']);
  }
}
