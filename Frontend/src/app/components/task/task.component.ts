import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  loading: boolean = true ;
  taskDialog: boolean = true ;
  submitted: boolean = true;
  newTask: Task = {
   
    title: '',
    description: '',
    status: 'ToDo',
    priority: 'Low',
    deadline: new Date()
  };
  task: Task = new Task ();
  constructor(private taskService: TaskService,
              private messageService : MessageService
  ) {}

  ngOnInit(): void {
    this.getAll();
   
  }

  getAll() {
    this.taskService.getAllTasks().subscribe(
      (response) => {
        this.tasks = response.data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading boards:', error);
        this.loading = false;
      }
    );
  }

  openAddBoardDialog() {
    this.task = new Task();
    this.taskDialog = true;
  }

  closeAddBoardDialog() {
    this.taskDialog = false;
  }




  addTask() {
    this.submitted = true;

    if (!this.task.title ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Board name and wallpaper are required.',
        life: 3000,
      });
      return;
    }

    this.loading = true;

    this.taskService.addTask(this.task).subscribe(
      (res) => {
        this.tasks.push(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Board Created',
          life: 3000,
        });
        this.tasks = [...this.tasks];
        this.task = new Task(); // Reset the board model
        this.loading = false;
        this.taskDialog = false;
        this.submitted = false;
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create Board',
          life: 3000,
        });
        this.loading = false;
        this.submitted = false;
      }
    );
  }}
