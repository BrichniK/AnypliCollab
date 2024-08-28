import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/services/boards.service';
import { Board, Task } from 'src/app/models/board';
import { User } from 'src/app/models/user';
import { settingService } from 'src/app/services/setting.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  board: Board | undefined;
  loading: boolean = true;
  boardDialog: boolean = false;
  showTaskForm: boolean = false;
  selectedFile: File | null = null;
  uploadedFileUrl: string | null = null;

  newTask: Task = {
    id : '',
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    deadline: new Date(),
  };
  users: User[] = []; // List of users

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private settingService: settingService,
    private taskService : TaskService
  ) {}

  ngOnInit(): void {
    this.getBoardDetail();
    this.getUsers(); 
    this.getTasks(); 
  }

  getBoardDetail() {
    const boardId = this.route.snapshot.paramMap.get('id');
    if (boardId) {
      this.boardService.getBoardById(boardId).subscribe(
        (response) => {
          this.board = response;
          this.loading = false;
          if (this.board && this.board.wallpaper) {
            this.setWallpaper(this.board.wallpaper);
          }
        },
        (error) => {
          console.error('Error loading board details:', error);
          this.loading = false;
        }
      );
    }
  }

  getUsers() {
    this.settingService.getAllUsers().subscribe(
      (response) => {
        this.users = response.data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    );
  }

  getTasks() {
    const boardId = this.route.snapshot.paramMap.get('id');
    if (boardId) {
      this.boardService.getTasksByBoardId(boardId).subscribe(
        (tasks) => {
          if (Array.isArray(tasks)) {
          
            if (this.board) {
              this.board.tasks = tasks;
            }
          } else {
            console.error('Error: Expected an array of tasks, but received:', tasks);
          }
        },
        (error) => {
          console.error('Error loading tasks:', error);
        }
      );
    }
  }

  getUserName(userId: string | undefined): string {
    if (!userId) {
      return 'Unknown'; 
    }
    const user = this.users.find(user => user.id === userId);
    return user ? user.name || 'Unknown' : 'Unknown'; 
  }

  setWallpaper(url: string) {
    console.log('Setting wallpaper:', url);
    const boardDetailContainer = document.querySelector('.board-detail-container');
    if (boardDetailContainer) {
      this.renderer.setStyle(boardDetailContainer, 'backgroundImage', `url(${url})`);
      this.renderer.setStyle(boardDetailContainer, 'backgroundSize', 'cover');
      this.renderer.setStyle(boardDetailContainer, 'backgroundPosition', 'center');
    }
  }

  toggleTaskForm() {
    this.showTaskForm = !this.showTaskForm;
  }

  addTask(): void {
    const boardId = this.route.snapshot.paramMap.get('id');
  
    if (this.board && this.newTask.title && this.newTask.description) {
      this.boardService.addTaskToBoard(boardId!, this.newTask).subscribe(
        (task: Task) => {
          // Update the board's tasks list
          if (this.board?.tasks) {
            this.board.tasks.push(task);
          } else if (this.board) {
            this.board.tasks = [task];
          }

          // Reset the newTask object and close the form
          this.newTask = {
            id : '',
            title: '',
            description: '',
            status: 'To Do',
            deadline: new Date(),
            priority: 'Low'
          };
          this.showTaskForm = false;
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
    }
  }


  updateTaskStatus(task: Task) {
    // Determine the next status based on the current status
    let newStatus: 'To Do' | 'Proceeding' | 'Done';

    switch (task.status) {
      case 'To Do':
        newStatus = 'Proceeding';
        break;
      case 'Proceeding':
        newStatus = 'Done';
        break;
      case 'Done':
      default:
        newStatus = 'To Do';
        break;
    }

    // Update the task status
    const updatedTask: Task = { ...task, status: newStatus };

    this.taskService.updateTask(task.id, updatedTask).subscribe(
      (response) => {
        console.log('Task status updated successfully:', response);
        // Update the local task with the response
        if (this.board) {
         

        }
      },
      (error) => {
        console.error('Error updating task status:', error);
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Handle file upload
  uploadFile() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedFileUrl = e.target.result as string;
  
        // Ensure board is defined before accessing its properties
        if (this.board) {
          this.board.uploadedFileUrl = this.uploadedFileUrl || ''; // Assign an empty string if null
        }
      };
  
      reader.readAsDataURL(this.selectedFile); // Read the selected file as a data URL
    }
  }

isImageFile(fileUrl: string): boolean {
  return fileUrl.match(/\.(jpg|jpeg|png)$/i) !== null;
}

isPdfFile(fileUrl: string): boolean {
  return fileUrl.match(/\.pdf$/i) !== null;
}
  
  
}
