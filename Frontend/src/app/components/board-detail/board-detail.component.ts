import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/services/boards.service';
import { Board } from 'src/app/models/board';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  board!: Board;
  newTaskName: string = '';
  newTaskDescription: string = '';

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.board = this.boardService.getBoardById(id) || { id: 0, name: '', wallpaper: '',tasks:[] }; // Handle undefined case
  }

  addTask() {
    if (this.newTaskName && this.newTaskDescription) {
      // Add task logic here
      // Example: this.board.tasks.push({ name: this.newTaskName, description: this.newTaskDescription });
      this.newTaskName = '';
      this.newTaskDescription = '';
    }
  }
}
