import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-auth-shell',
  template: '',
  standalone: true,
  styles: [':host { display: none; }']
})
export class AuthShellComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    // Immediate redirect without any delays
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/public']);
    }
  }
}
