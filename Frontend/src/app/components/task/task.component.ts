// src/app/task/task.component.ts
import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent {
    @Input() task!: Task;
}
