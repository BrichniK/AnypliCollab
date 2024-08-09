import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/board';

@Component({
  selector: 'app-task-board',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.css']
})
export class TaskBoardComponent {
  boards = [
    {
      id: 1,
      name: 'Board 1',
      tasks: [
        { id: 1, title: 'Task 1', description: 'Description 1', status: 'todo', priority: 'High', deadline: new Date() },
        { id: 2, title: 'Task 2', description: 'Description 2', status: 'in-progress', priority: 'Low', deadline: new Date() },
        { id: 3, title: 'Task 3', description: 'Description 3', status: 'done', priority: 'High', deadline: new Date() }
      ]
    },
    {
      id: 2,
      name: 'Board 2',
      tasks: [
        { id: 4, title: 'Task 4', description: 'Description 4', status: 'todo', priority: 'Low', deadline: new Date() },
        { id: 5, title: 'Task 5', description: 'Description 5', status: 'done', priority: 'High', deadline: new Date() }
      ]
    }
  ];

  dropBoard(event: CdkDragDrop<any[]>) {
    // Handle board reordering if needed
  }

  dropTask(event: CdkDragDrop<Task[], Task[]>, board: any, column: 'todo' | 'in-progress' | 'done') {
    const task = event.item.data as Task;
    

    // Update the board's tasks list after dropping the task
 
  }
}
