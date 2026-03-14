import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>Реєстрація</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Повне ім'я</mat-label>
              <input matInput formControlName="fullName">
              <mat-error *ngIf="registerForm.get('fullName')?.hasError('required') && registerForm.get('fullName')?.touched">
                Повне ім'я є обов'язковим полем
              </mat-error>
              <mat-error *ngIf="registerForm.get('fullName')?.hasError('minlength') && registerForm.get('fullName')?.touched">
                Мінімальна довжина - 2 символи
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email">
              <mat-error *ngIf="registerForm.get('email')?.hasError('required') && registerForm.get('email')?.touched">
                Email є обов'язковим полем
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email') && registerForm.get('email')?.touched">
                Введіть коректний email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Пароль</mat-label>
              <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button">
                <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required') && registerForm.get('password')?.touched">
                Пароль є обов'язковим полем
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength') && registerForm.get('password')?.touched">
                Мінімальна довжина - 6 символів
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Підтвердити пароль</mat-label>
              <input matInput [type]="hideConfirmPassword() ? 'password' : 'text'" formControlName="confirmPassword">
              <button mat-icon-button matSuffix (click)="hideConfirmPassword.set(!hideConfirmPassword())" type="button">
                <mat-icon>{{ hideConfirmPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required') && registerForm.get('confirmPassword')?.touched">
                Підтвердження пароля є обов'язковим полем
              </mat-error>
              <mat-error *ngIf="registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched">
                Паролі не збігаються
              </mat-error>
            </mat-form-field>

            <div class="error-message" *ngIf="errorMessage()">
              {{ errorMessage() }}
            </div>

            <button mat-raised-button color="primary" type="submit" [disabled]="isLoading()">
              <mat-spinner diameter="20" *ngIf="isLoading()"></mat-spinner>
              {{ isLoading() ? 'Реєстрація...' : 'Зареєструватися' }}
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions class="card-actions">
          <p>Вже маєте акаунт? <a mat-button routerLink="/login">Увійти</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .register-card {
      max-width: 400px;
      width: 100%;
    }

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .full-width {
      width: 100%;
    }

    .register-button {
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

    @media (max-width: 480px) {
      .register-container {
        padding: 1rem;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  isLoading = signal(false);
  errorMessage = signal('');

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const { fullName, email, password } = this.registerForm.value;

      this.authService.register(fullName, email, password).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          if (response.success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage.set(response.message || 'Помилка реєстрації');
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
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }
}
