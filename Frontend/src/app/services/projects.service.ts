// src/app/services/project.service.ts
import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private projects: Project[] = [
        {
            id: 1,
            name: 'Project 1',
            fond:'',
            tasks: [
                { id: 1, title: 'Task 1', description: 'Task 1 Description', status: 'To Do' },
                { id: 2, title: 'Task 2', description: 'Task 2 Description', status: 'Proceeding' },
            ]
        },
        // Add more projects here
    ];

    getProjects(): Project[] {
        return this.projects;
    }

    addProject(project: Project): void {
        this.projects.push(project);
    }

   
}
