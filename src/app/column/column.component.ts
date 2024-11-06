import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Column, Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskComponent } from '../task/task.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogData } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskComponent],
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() column!: Column;
  connectedDropLists: string[] = ['to-do', 'in-progress', 'done','failed'];
  getColumnHeaderClass(title: string): string {
    switch (title) {
      case 'To Do':
        return 'bg-to-do';
      case 'In Progress':
        return 'bg-in-progress';
      case 'Done':
        return 'bg-done';
      case 'Failed':
        return 'bg-failed';
      default:
        return 'bg-secondary';
    }
  }

  constructor(private taskService: TaskService,private dialog: MatDialog) {}

  ngOnInit() {
    // Ensure `connectedDropLists` includes all required IDs
    this.connectedDropLists = this.connectedDropLists.filter(id => id !== this.column.id);
  }

  get taskCount(): number {
    return this.column.tasks.length;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.column.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  updateTask(updatedTask: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      maxWidth: '500px',
      minWidth: '400px',
      data: { title: updatedTask.title, description: updatedTask.description }
    });

    dialogRef.afterClosed().subscribe((result: TaskDialogData | undefined) => {
      if (result) {
        const index = this.column.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          this.column.tasks[index] = { ...updatedTask, ...result };
        }
      }
    });
  }

}
