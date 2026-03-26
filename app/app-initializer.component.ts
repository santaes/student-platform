import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-app-initializer',
  template: `
    @if (!authChecked) {
      <div class="loading-screen">
        <div class="loading-spinner"></div>
      </div>
    } @else {
      <router-outlet></router-outlet>
    }
  `,
  standalone: true,
  imports: [RouterOutlet],
  styles: [`
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #1976d2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class AppInitializerComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  authChecked = false;

  constructor() {
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    // Wait for auth to be checked
    while (!this.authService.isAuthChecked()) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Now that auth is checked, perform the redirect
    this.authChecked = true;
    
    // Use setTimeout to ensure this happens after change detection
    setTimeout(() => {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/public']);
      }
    }, 0);
  }
}
