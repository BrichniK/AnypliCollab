import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isAdmin()) {
        return true;
      } else {
        this.router.navigate(['/forbidden']); // Navigate to a forbidden page or an appropriate page for 'COLLAB'
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
