import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { CommonEngine } from '@angular/ssr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<Task>(); // Emit updated task to parent component
  
  isEditing = false; // Track edit mode

  // Enable edit mode
  enableEdit() {
    this.isEditing = false;
    this.taskUpdated.emit(this.task);
  }

}
