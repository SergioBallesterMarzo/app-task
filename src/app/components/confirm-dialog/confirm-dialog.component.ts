import { Component, Inject} from '@angular/core';
import { Task } from 'src/app/interface/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {}

  onClick( click: boolean ): void {
    this.dialogRef.close(click);
  }
}
