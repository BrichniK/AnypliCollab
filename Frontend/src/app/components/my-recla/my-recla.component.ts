import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { StorageService } from 'src/app/services/storage.service';
import { Reclamation } from 'src/app/models/reclamation';

@Component({
  selector: 'app-my-recla',
  templateUrl: './my-recla.component.html',
  styleUrls: ['./my-recla.component.css']
})
export class MyReclaComponent implements OnInit {
  
  errorMessage: string = '';
  isLoading: boolean = true;
  reclamationForm!: FormGroup;
  reclamations: Reclamation[] = [];
  showReclamationForm: boolean = false;

  constructor(
    private reclamationService: ReclamationService,
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadReclamations();
    this.reclamationForm = this.fb.group({
      commentaire: ['', Validators.required]
    });
  }

  loadReclamations(): void {
    const user = this.storageService.getUser();
    console.log('Retrieved user:', user);

    if (user && user.id) {
      this.isLoading = true;

      this.reclamationService.getReclamationsByUserId(user.id).subscribe(
        (response) => {
          console.log('Reclamations response:', response);
          this.reclamations = response.data || [];
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching reclamations:', error);
          this.errorMessage = '';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'User not found. Please log in again.';
      this.isLoading = false;
    }
  }

  addReclamation(): void {
    if (this.reclamationForm.invalid) {
      return;
    }
  
    const storedUser = this.storageService.getUser(); // Retrieve user information
    if (!storedUser || !storedUser.id) {
      this.errorMessage = 'User ID is required';
      return;
    }
  
    const newReclamation: Reclamation = {
      commentaire: this.reclamationForm.value.commentaire,
      dateadd: new Date(),
      dateupdate: new Date(),
      datetrait: new Date(),
      statut: 'WAITING',
      userId: storedUser.id 
    };
  
    this.reclamationService.addReclamation(newReclamation).subscribe(
      () => {
        this.loadReclamations();
        this.reclamationForm.reset();
        this.showReclamationForm = false;
      },
      (error) => {
        console.error('Error adding reclamation:', error);
        this.errorMessage = 'Failed to add reclamation';
      }
    );
  }
  
}
