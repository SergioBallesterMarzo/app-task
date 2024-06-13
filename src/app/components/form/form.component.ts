import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
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

 task:Task ={
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
  ) { }

  get currentTask(): Task{
    const task = this.formulario.value as Task
    return task;
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id:  [''],
      name:     ['', [Validators.required, Validators.minLength(3)]],
      employee: ['', [Validators.required,Validators.minLength(3)]],
      status:   [ '' ,[ Validators.required]]
    });

    if(!this.router.url.includes('/edit'))return;
    this.route.params
    .pipe(
      switchMap(({id}) => this.taskService.getTaskById$(id))
    )
    .subscribe( (task) =>{
      if(!task) return this.router.navigateByUrl('/');
      this.formulario.patchValue(task);
      return;
    })
  }

  onSubmit() {
   if (this.currentTask.id) {
        this.taskService.updateTask$(this.currentTask).subscribe(
            (response) => {
                console.log('Tarea Actualizada', response);
                this.showSnackbar('Tarea Actualizada', 'Cerrar');
                this.router.navigate(['/home']);
            }
        );
      }
      else{
        const task = this.formulario.value
        delete task.id
        this.taskService.createTask$(task).subscribe(
        (response) => {
            console.log('Tarea creada:', response);
            this.showSnackbar('Tarea creada', 'Cerrar');
            this.router.navigate(['/home']);
        },
      );
    }
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
    return this.route.snapshot.url.some(segment => segment.path === 'edit');
  }
}
