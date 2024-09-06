import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Reclamation } from 'src/app/models/reclamation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamationForm: FormGroup;
  reclamations: Reclamation[] = [];
  isUpdating: boolean = false;
  selectedReclamation: Reclamation | null = null;

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService
  ) {
    this.reclamationForm = this.fb.group({
      commentaire: ['', Validators.required],
      dateadd: [{ value: '', disabled: true }], // Disabled field for display
      dateupdate: [{ value: '', disabled: true }] // Disabled field for display
    });
  }

  ngOnInit(): void {
    this.getAllReclamations();
  }

  getAllReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(data => {
      this.reclamations = data.data;
    });
  }

  editReclamation(reclamation: Reclamation): void {
    if (reclamation.statut === 'WAITING') {
      // Update status to 'TREATED'
      this.reclamationService.updateStatus(reclamation.id!, 'TREATED').subscribe(response => {
        if (response.status) {
          // Update local list
          this.getAllReclamations();
        } else {
          console.error('Failed to update status:', response.message);
        }
      });
    }

    this.isUpdating = true;
    this.selectedReclamation = reclamation;

    // Set form values to the selected reclamation's properties
    this.reclamationForm.patchValue({
      commentaire: reclamation.commentaire,
      dateadd: reclamation.dateadd,
      dateupdate: reclamation.dateupdate
    });
  }
}
