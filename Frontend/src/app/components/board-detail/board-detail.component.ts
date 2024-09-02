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
  showTaskForm: boolean = false;
  selectedFile: File | null = null;
  uploadedFileUrl: string | null = null;

  newTask: Task = {
    id: '',
    title: '',
    description: '',
    status: 'ToDo',
    priority: 'Low',
    deadline: new Date(),
  };
  users: User[] = []; 

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private settingService: settingService,
    private taskService: TaskService
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
          if (this.board) {
            this.loadWallpaper(boardId);
          }
        },
        (error) => {
          console.error('Error loading board details:', error);
          this.loading = false;
        }
      );
    }
  }

  loadWallpaper(boardId: string) {
    this.boardService.getwallpaper(boardId).subscribe(
      (wallpaperUrl) => {
        this.setWallpaper(wallpaperUrl);
        console.log('wallpaper',wallpaperUrl)
      },
      (error) => {
        console.error('Error loading wallpaper:', error);
      }
    );
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
  
  addTask(): void {
    const boardId = this.route.snapshot.paramMap.get('id');
  
    if (this.board && this.newTask.title && this.newTask.description) {
      this.boardService.addTaskToBoard(boardId!, this.newTask).subscribe(
        (task: Task) => {
          if (this.board?.tasks) {
            this.board.tasks.push(task);
          } else if (this.board) {
            this.board.tasks = [task];
          }
          this.newTask = {
            id: '',
            title: '',
            description: '',
            status: 'ToDo',
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
    const updatedTask: Task = {
      ...task,
      status: task.status 
    };
  
    this.taskService.updateTask(task.id, updatedTask).subscribe(
      (response) => {
        console.log('Task status updated successfully:', response);
      },
      (error) => {
        console.error('Error updating task status:', error);
      }
    );
  }
}
