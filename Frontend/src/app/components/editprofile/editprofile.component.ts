import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/user';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {


  isAdmin: boolean = false;
  exportColumns: any[] | undefined;
  cols: any[] | undefined;
  countUsers: number = 0;
  roles: any[] = Object.values(Role);
  selectedRole: Role = Role.COLLAB;
  submitted: boolean = false;
  userImageUrl: string | ArrayBuffer | null = '';
  registerForm!: FormGroup;

  editForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, email: string, role: Role }
  ) {
    this.editForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      role: [data.role, Validators.required]
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
