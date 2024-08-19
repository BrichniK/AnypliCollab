import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service'; 
import { Board } from 'src/app/models/board';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  loading: boolean = true;

  constructor(
    private boardService: BoardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
    console.log('test',this.boards)
    console.log('jbazhbfjazhb')
  }



  getAll() {
    this.boardService.getAllBoards().subscribe(
      (response) => {
        console.log('Boards:', response);
        this.boards = response.data; // Assign only the data array to this.boards
        this.loading = false;
        console.log('test2', this.boards); // Updated to log the boards data
      },
      (error) => {
        console.error('Error loading boards:', error);
        this.loading = false;
      }
    );
  }
  
  
}