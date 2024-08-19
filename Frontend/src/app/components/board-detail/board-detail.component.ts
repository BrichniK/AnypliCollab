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

  }


  }






