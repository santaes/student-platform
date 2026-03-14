import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/auth/auth.service';
import { User, StudentProfile } from '../../shared/models/index';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h1>Профіль користувача</h1>
        <p>Керуйте вашими особистими даними</p>
      </div>

      <div class="profile-content">
        <mat-card class="profile-card">
          <mat-card-header>
            <mat-card-title>Особиста інформація</mat-card-title>
            <mat-icon class="edit-icon" (click)="toggleEditMode()">edit</mat-icon>
          </mat-card-header>
          
          <mat-card-content>
            @if (isEditMode()) {
              @let profile = editableProfile();
              <form class="profile-form">
                <mat-form-field appearance="outline">
                  <mat-label>Повне ім'я</mat-label>
                  <input matInput [(ngModel)]="profile!.fullName" name="fullName">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput [(ngModel)]="profile!.email" name="email" disabled>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Про себе</mat-label>
                  <textarea matInput [(ngModel)]="profile!.bio" name="bio" rows="4"></textarea>
                </mat-form-field>

                <div class="form-actions">
                  <button mat-raised-button color="primary" (click)="saveProfile()">
                    <mat-icon>save</mat-icon>
                    Зберегти
                  </button>
                  <button mat-stroked-button (click)="cancelEdit()">
                    <mat-icon>cancel</mat-icon>
                    Скасувати
                  </button>
                </div>
              </form>
            } @else {
              @let user = currentUser();
              <div class="profile-display">
                <div class="profile-field">
                  <mat-icon class="field-icon">person</mat-icon>
                  <div class="field-content">
                    <label>Повне ім'я</label>
                    <p>{{ user?.fullName }}</p>
                  </div>
                </div>

                <div class="profile-field">
                  <mat-icon class="field-icon">email</mat-icon>
                  <div class="field-content">
                    <label>Email</label>
                    <p>{{ user?.email }}</p>
                  </div>
                </div>

                @if (user?.bio) {
                  <div class="profile-field">
                    <mat-icon class="field-icon">description</mat-icon>
                    <div class="field-content">
                      <label>Про себе</label>
                      <p>{{ user?.bio }}</p>
                    </div>
                  </div>
                }

                <div class="profile-field">
                  <mat-icon class="field-icon">calendar_today</mat-icon>
                  <div class="field-content">
                    <label>Дата реєстрації</label>
                    <p>{{ user?.createdAt | date:'fullDate' }}</p>
                  </div>
                </div>
              </div>
            }
          </mat-card-content>
        </mat-card>

        <mat-card class="stats-card">
          <mat-card-header>
            <mat-card-title>Статистика навчання</mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">75%</div>
                <div class="stat-label">Загальний прогрес</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">12</div>
                <div class="stat-label">Завершені уроки</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">8</div>
                <div class="stat-label">Завершені завдання</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">15</div>
                <div class="stat-label">Днів навчання</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .profile-header h1 {
      font-size: 2.5rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .profile-header p {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }

    .profile-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .profile-card .mat-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .edit-icon {
      cursor: pointer;
      font-size: 1.5rem;
      color: #666;
      transition: color 0.2s ease;
    }

    .edit-icon:hover {
      color: #1976d2;
    }

    .profile-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .profile-display {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .profile-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .profile-item mat-icon {
      font-size: 1.5rem;
      color: #666;
    }

    .item-content {
      flex: 1;
    }

    .item-label {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .item-value {
      font-size: 1.1rem;
      font-weight: 500;
      color: #333;
    }

    .stats-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .stats-card .mat-card-title {
      color: white;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .profile-container {
        padding: 1rem;
      }

      .profile-header h1 {
        font-size: 2rem;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProfileComponent {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  currentUser = computed(() => this.authService.getCurrentUser());
  isEditMode = signal(false);
  editableProfile = signal<User | null>(null);

  constructor() {
    this.resetEditableProfile();
  }

  toggleEditMode(): void {
    this.isEditMode.set(!this.isEditMode());
    if (this.isEditMode()) {
      this.resetEditableProfile();
    }
  }

  resetEditableProfile(): void {
    const user = this.currentUser();
    if (user) {
      this.editableProfile.set({ ...user });
    }
  }

  saveProfile(): void {
    const profile = this.editableProfile();
    if (!profile) return;

    // Convert User to StudentProfile for API call
    const studentProfile: StudentProfile = {
      id: profile.id,
      userId: profile.id,
      enrolledTrack: 'ukrainian-language', // Default value
      currentLevel: 1, // Default value
      progressPercentage: 0, // Default value
      upcomingTasks: [], // Default value
      bio: profile.bio,
      updatedAt: new Date()
    };

    // In a real app, this would call the API to update the profile
    this.apiService.updateStudentProfile(studentProfile).subscribe({
      next: (updatedProfile) => {
        console.log('Profile saved successfully:', updatedProfile);
        // Update the current user in auth service if needed
        this.isEditMode.set(false);
        this.resetEditableProfile();
      },
      error: (error) => {
        console.error('Failed to save profile:', error);
      }
    });
  }

  cancelEdit(): void {
    this.isEditMode.set(false);
    this.resetEditableProfile();
  }
}
