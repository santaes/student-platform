import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Вхід</mat-card-title>
          <mat-card-subtitle>Вхід до навчальної платформи</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" autocomplete="email">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched">
                Email є обов'язковим полем
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email') && loginForm.get('email')?.touched">
                Введіть коректний email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Пароль</mat-label>
              <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button">
                <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required') && loginForm.get('password')?.touched">
                Пароль є обов'язковим полем
              </mat-error>
            </mat-form-field>

            <div class="error-message" *ngIf="errorMessage()">
              {{ errorMessage() }}
            </div>

            <button mat-raised-button color="primary" type="submit" class="login-button"
                    [disabled]="isLoading()">
              <mat-spinner diameter="20" *ngIf="isLoading()"></mat-spinner>
              <span>{{ isLoading() ? 'Вхід...' : 'Увійти' }}</span>
            </button>

            <div class="forgot-password">
              <a mat-button>Забули пароль?</a>
            </div>

            <div class="demo-info">
              <mat-card class="demo-card">
                <mat-card-header>
                  <mat-card-title class="demo-title">Демонстраційні дані</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p><strong>Email:</strong> john.doe@example.com</p>
                  <p><strong>Пароль:</strong> password123</p>
                  <p><strong>Або:</strong></p>
                  <p><strong>Email:</strong> jane.smith@example.com</p>
                  <p><strong>Пароль:</strong> password123</p>
                </mat-card-content>
              </mat-card>
            </div>
          </form>
        </mat-card-content>

        <mat-card-actions class="card-actions">
          <p>Немає акаунту? <button mat-button>Запам'ятати мене</button></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-card {
      max-width: 400px;
      width: 100%;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .full-width {
      width: 100%;
    }

    .login-button {
      margin-top: 1rem;
      padding: 0.75rem;
      font-size: 1rem;
    }

    .error-message {
      color: #f44336;
      font-size: 0.875rem;
      text-align: center;
      margin-top: 0.5rem;
    }

    .card-actions {
      justify-content: center;
      padding-top: 1rem;
    }

    .card-actions p {
      margin: 0;
      color: #666;
    }

    .card-actions a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .card-actions a:hover {
      text-decoration: underline;
    }

    .demo-info {
      margin-top: 1.5rem;
    }

    .demo-card {
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
    }

    .demo-title {
      font-size: 1rem;
      font-weight: 600;
      color: #666;
    }

    .demo-card p {
      margin: 0.5rem 0;
      font-size: 0.9rem;
      color: #333;
    }

    @media (max-width: 480px) {
      .login-container {
        padding: 1rem;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = signal(true);
  isLoading = signal(false);
  errorMessage = signal('');

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          if (response.success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage.set(response.message || 'Помилка входу');
          }
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Сталася помилка. Спробуйте ще раз.');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
