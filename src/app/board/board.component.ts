import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Column } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { ColumnComponent } from '../column/column.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogData } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule,ColumnComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  columns: Column[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {
    this.columns = this.taskService.getColumns();
  }

  addTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      maxWidth: '500px',
      minWidth: '400px',
      data: { title: '', description: '' }
    });

    dialogRef.afterClosed().subscribe((result: TaskDialogData | undefined) => {
      if (result) {
        const toDoColumn = this.columns.find(column => column.title === 'To Do');
        if (toDoColumn) {
          const newTask = { id: Date.now().toString(), ...result };
          this.taskService.addTask(newTask, toDoColumn.id);
        }
      }
    });
  }
  
}
