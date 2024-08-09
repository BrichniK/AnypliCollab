import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/projects.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
      this.projects = this.projectService.getProjects();
  }

  selectProject(project: Project) {
      // Logic to display tasks for the selected project
  }
}
