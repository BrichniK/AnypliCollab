import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashbordadmin',
  templateUrl: './dashbordadmin.component.html',
  styleUrls: ['./dashbordadmin.component.css'],
  providers: [MessageService]
})
export class DashbordadminComponent implements OnInit {
  reclamations: Reclamation[] = [];
  reclamationDialog: boolean = false;
  reclamation: Reclamation = new Reclamation();
  loading: boolean = false;
  
  constructor(
    private reclamationService: ReclamationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations() {
    this.reclamationService.getAllReclamations().subscribe({
      next: (data) => {
        this.reclamations = data;
      },
      error: (err) => {
        console.error('Error loading reclamations', err);
      }
    });
  }

  openNew() {
    this.reclamation = new Reclamation();
    this.reclamationDialog = true;
  }

  saveReclamation() {
    this.loading = true;
    if (this.reclamation.id) {
      // Update existing reclamation
      this.reclamationService.updateReclamation(this.reclamation).subscribe({
        next: (res) => {
          const index = this.reclamations.findIndex(r => r.id === this.reclamation.id);
          if (index !== -1) {
            this.reclamations[index] = res;
          }
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reclamation updated' });
          this.reclamationDialog = false;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error updating reclamation', err);
          this.loading = false;
        }
      });
    } else {
      // Create new reclamation
      this.reclamationService.addReclamation(this.reclamation).subscribe({
        next: (res) => {
          this.reclamations.push(res);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reclamation created' });
          this.reclamationDialog = false;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error creating reclamation', err);
          this.loading = false;
        }
      });
    }
  }

  editReclamation(reclamation: Reclamation) {
    this.reclamation = { ...reclamation };
    this.reclamationDialog = true;
  }

//   deleteReclamation(reclamation: Reclamation) {
//     this.reclamationService.removeReclamation(reclamation.id!).subscribe({
//       next: () => {
//         this.reclamations = this.reclamations.filter(r => r.id !== reclamation.id);
//         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reclamation deleted' });
//       },
//       error: (err) => {
//         console.error('Error deleting reclamation', err);
//       }
//     });
//   }

  hideDialog() {
    this.reclamationDialog = false;
  }
}
