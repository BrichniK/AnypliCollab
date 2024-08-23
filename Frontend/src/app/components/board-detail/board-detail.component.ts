import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/services/boards.service';
import { Board, Task } from 'src/app/models/board';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  board: Board | undefined;
  loading: boolean = true;
  newTask: Task = {
    title: '',
    description: '',
    status: 'ToDo',
    priority: 'Low',
    deadline: new Date() 
  };

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBoardDetail();
  }

  getBoardDetail() {
    const boardId = this.route.snapshot.paramMap.get('id');
    console.log('Board ID:', boardId); 
    if (boardId) {
      this.boardService.getBoardById(boardId).subscribe(
        (response) => {
          this.board = response;
          this.loading = false;
        },
        (error) => {
          console.error('Error loading board details:', error);
          this.loading = false;
        }
      );
    }
  }
  

  addTask(): void {
    const boardId = this.route.snapshot.paramMap.get('id');
    
    if (this.board && this.newTask.title && this.newTask.description) {
      this.boardService.addTaskToBoard(this.board.id, this.newTask).subscribe(
        (task) => {
          if (this.board?.tasks) {
            this.board.tasks.push(task);
          }
        
          this.newTask = {
            title: '',
            description: '',
            status: 'ToDo',
            deadline: new Date(),
            priority: 'Low'
          };
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
    }
  }
  
  
}
