import { Injectable } from '@angular/core';
import { Task, Column } from '../models/task.model';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private columns: Column[] = [
    {
      id: 'to-do',
      title: 'To Do',
      tasks: [
        { id: '1', title: 'Task 1', description: 'Set up project repository.' },
        { id: '2', title: 'Task 2', description: 'Review requirements document.' },
        { id: '3', title: 'Task 3', description: 'Define project goals and deliverables.' },
        { id: '4', title: 'Task 4', description: 'Design wireframes for main pages.' },
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: '5', title: 'Task 6', description: 'Develop user authentication module.' },
        { id: '6', title: 'Task 7', description: 'Set up CI/CD pipeline.' },
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: '7', title: 'Task 10', description: 'Perform initial testing on login flow.' },
        { id: '8', title: 'Task 11', description: 'Complete project kickoff meeting.' },
             ]
    },{
      id:'failed',
      title:'Failed',
      tasks:[
        { id: '9', title: 'Task 14', description: 'Create initial project structure and setup files.' },

      ]
    }
  ];
  
  getColumns() {
    return this.columns;
  }

  getAllColumnIds(): string[] {
    return this.columns.map(column => column.id);
  }

  addTask(task: Task, columnId: string) {
    const column = this.columns.find(col => col.id === columnId);
    column?.tasks.push(task);
  }

  moveTask(event: CdkDragDrop<Task[]>, targetColumnId: string) {
    const targetColumn = this.columns.find(col => col.id === targetColumnId);
    if (targetColumn) {
      transferArrayItem(
        event.previousContainer.data,
        targetColumn.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
