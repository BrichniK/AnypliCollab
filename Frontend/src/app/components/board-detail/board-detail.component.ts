import { Component, OnInit } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board';
import { Task } from 'src/app/models/task';  // Import the Task model

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  boards: Board[] = [];
  newTaskName: string = '';
  newTaskDescription: string = '';

  positions = [
    { left: 25, top: 70},
    { left: 50, top: 100 },
    { left: 50, top: 200 },
  ];

  occupiedPositions: Array<{ left: number; top: number }> = [];

  constructor() {}

  ngOnInit(): void {
    this.boards = [
      { id: 1, name: 'Project 1', tasks: [],wallpaper: 'assets/images/Boards/b3.png',users:[] },
    ];

    this.boards[0].tasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do', position: this.positions[0] ,wallpaper: 'assets/images/Boards/b3.png'},
      { id: 2, title: 'Task 2', description: 'Description 2', status: 'Proceeding', position: this.positions[1],wallpaper: 'assets/images/Boards/b3.png' },
    ];
  }

  addTask(boardId: number) {
    const board = this.boards.find(b => b.id === boardId);
    if (board && this.newTaskName && this.newTaskDescription) {
      const newTask: Task = {
        id: board.tasks.length + 1,
        title: this.newTaskName,
        description: this.newTaskDescription,
        status: 'To Do',
        position: { left: 0, top: 0 },
        priority:'High',
        deadline:new Date(2025, 8, 12),
        wallpaper: 'assets/images/Boards/b3.png'
      };

      board.tasks.push(newTask);

      this.newTaskName = '';
      this.newTaskDescription = '';
    }
  }

  onDragReleased(event: any, taskId: number, boardId: number) {
    const { x, y } = event.source.getFreeDragPosition();
    const closestPoint = this.getClosestAvailablePosition(x, y);

    event.source._dragRef.setFreeDragPosition({ x: closestPoint.left, y: closestPoint.top });

    this.updateOccupiedPositions(taskId, boardId, closestPoint);
  }

  getClosestAvailablePosition(x: number, y: number) {
    const availablePositions = this.positions.filter(
      pos => !this.occupiedPositions.some(occ => occ.left === pos.left && occ.top === pos.top)
    );

    return availablePositions.reduce((closest, point) => {
      const distance = Math.sqrt(Math.pow(point.left - x, 2) + Math.pow(point.top - y, 2));
      return distance < Math.sqrt(Math.pow(closest.left - x, 2) + Math.pow(closest.top - y, 2)) ? point : closest;
    }, availablePositions[0]);
  }

  updateOccupiedPositions(taskId: number, boardId: number, newPosition: { left: number; top: number }) {
    const board = this.boards.find(b => b.id === boardId);
    const task = board?.tasks.find(t => t.id === taskId);
    if (task) {
      const oldPosition = task.position;
      this.occupiedPositions = this.occupiedPositions.filter(
        pos => pos.left !== oldPosition.left || pos.top !== oldPosition.top
      );
      this.occupiedPositions.push(newPosition);

      task.position = newPosition;
    }
  }
}
