import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      @if (!authService.isAuthChecked()) {
        <div class="loading-screen">
          <div class="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      } @else {
        <div class="debug-info">
          <p>Auth checked: {{ authService.isAuthChecked() }}</p>
          <p>Is logged in: {{ authService.isLoggedIn() }}</p>
          <p>Token exists: {{ hasToken() }}</p>
          <p>User exists: {{ hasUser() }}</p>
        </div>
        <router-outlet></router-outlet>
      }
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('student-learning-platform');
  authService = inject(AuthService);

  hasToken(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  hasUser(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('currentUser');
    }
    return false;
  }
}
