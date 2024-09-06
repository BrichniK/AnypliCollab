import { Component, OnInit } from '@angular/core';
import { Chart , registerables} from 'chart.js';
import { BoardService } from 'src/app/services/boards.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalTasks: number = 0;
  totalBoards: number = 0;
  activities: any[] = [];
  taskCounts: { ToDo: number, Proceeding: number, Done: number } = { ToDo: 0, Proceeding: 0, Done: 0 };
  taskCountp: { High: number, Low: number } = { High: 0, Low: 0 };
  reclaCount: { WAITING: number, TREATED: number } = { WAITING: 0, TREATED: 0 };
  chart: any;
  constructor(
    private usersService: UsersService,
    private boardService: BoardService,
    private tasksService: TaskService,
    private reclaservice:ReclamationService
  ) {}

  ngOnInit(): void {
    this.loadTotalUsers();
    this.loadTotalBoards();
    this.loadTotalTasks();
    this.loadTaskStatusCounts();
    this.loadTaskPriorityCounts(); 
  }

  loadTotalUsers() {
    this.usersService.getTotalUsers().subscribe(
      (count: number) => {
        this.totalUsers = count;
      },
      (error) => {
        console.error('Error fetching total users:', error);
      }
    );
  }

  loadTotalBoards() {
    this.boardService.getTotalBoards().subscribe(
      (count: number) => {
        this.totalBoards = count;
      },
      (error) => {
        console.error('Error fetching total boards:', error);
      }
    );
  }

  loadTotalTasks() {
    this.tasksService.getTotalTasks().subscribe(
      (count: number) => {
        this.totalTasks = count;
      },
      (error) => {
        console.error('Error fetching total tasks:', error);
      }
    );
  }

  loadTaskStatusCounts() {
    this.tasksService.countTasksByStatus().subscribe(
      (counts: { ToDo: number, Proceeding: number, Done: number }) => {
        this.taskCounts = counts;
        this.createStatusChart(); // Create status chart
      },
      (error) => {
        console.error('Error fetching task status counts:', error);
      }
    );
  }

  loadTaskPriorityCounts() {
    this.tasksService.countTasksByPriority().subscribe(
      (countp: { High: number, Low: number }) => {
        this.taskCountp = countp;
        this.createPriorityChart(); // Create priority chart
      },
      (error) => {
        console.error('Error fetching task priority counts:', error);
      }
    );
  }
  loadReclaCounts() {
    this.reclaservice.countReclaByStatus().subscribe(
      (countp: { WAITING: number, TREATED: number }) => {
        this.reclaCount = countp;
        this.createReclaChart(); // Create priority chart
      },
      (error) => {
        console.error('Error fetching task recla counts:', error);
      }
    );
  }

  createStatusChart() {
    const statusCtx = (document.getElementById('statusChart') as HTMLCanvasElement).getContext('2d');
    if (statusCtx) {
      new Chart(statusCtx, {
        type: 'pie',
        data: {
          labels: ['To Do', 'Proceeding', 'Done'],
          datasets: [{
            data: [this.taskCounts.ToDo, this.taskCounts.Proceeding, this.taskCounts.Done],
            backgroundColor: ['#ff6384', '#36a2eb', '#1aa62f']
          }]
        }
      });
    }
  }

  createPriorityChart() {
    const priorityCtx = (document.getElementById('priorityChart') as HTMLCanvasElement).getContext('2d');
    if (priorityCtx) {
      new Chart(priorityCtx, {
        type: 'bar',
        data: {
          labels: ['High', 'Low'],
          datasets: [{
            label: 'Priority',
            data: [this.taskCountp.High, this.taskCountp.Low], // Corrected data order
            backgroundColor: ['#ff6384', '#36a2eb']
          }]
        }
      });
    }
  }
  createReclaChart() {
    const reclaCtx = (document.getElementById('RECLAChart') as HTMLCanvasElement).getContext('2d');
    if (reclaCtx) {
      new Chart(reclaCtx, {
        type: 'bar',
        data: {
          labels: ['WAITING', 'TREATED'],
          datasets: [{
            label: 'RECLAMATION',
            data: [this.reclaCount.TREATED, this.reclaCount.WAITING], // Corrected data order
            backgroundColor: ['#ff6384', '#36a2eb']
          }]
        }
      });
    }
  }
}