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

  addReclamation(): void {
    const newReclamation: Reclamation = {
      commentaire: this.reclamationForm.value.commentaire,
      dateadd: new Date(),
      dateupdate: new Date(), 
      datetrait: new Date(), 
      statut: 'WAITING', 
    };

    this.reclamationService.addReclamation(newReclamation).subscribe(() => {
      this.getAllReclamations();
      this.reclamationForm.reset();
    });
  }

  editReclamation(reclamation: Reclamation): void {
    this.isUpdating = true;
    this.selectedReclamation = reclamation;

    // Set form values to the selected reclamation's properties
    this.reclamationForm.patchValue({
      commentaire: reclamation.commentaire,
      dateadd: reclamation.dateadd,
      dateupdate: reclamation.dateupdate
    });
  }

  updateReclamation(): void {
    if (this.selectedReclamation) {
      this.selectedReclamation.commentaire = this.reclamationForm.value.commentaire;
      this.selectedReclamation.dateupdate = new Date(); // Update dateupdate field

      this.reclamationService.updateReclamation(this.selectedReclamation).subscribe(() => {
        this.getAllReclamations();
        this.reclamationForm.reset();
        this.isUpdating = false;
        this.selectedReclamation = null;
      });
    }
  }

  cancelUpdate(): void {
    this.reclamationForm.reset();
    this.isUpdating = false;
    this.selectedReclamation = null;
  }
}
