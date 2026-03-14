import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/auth/auth.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';
import { StudentProfile, Roadmap, Homework, RoadmapItemStatus, HomeworkStatus, User, DashboardStats, RecentActivity } from '../../shared/models/index';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    RouterModule,
    LoadingSpinnerComponent
  ],
  template: `
    @if (isLoading()) {
      <app-loading-spinner message="Завантаження даних..." />
    } @else {
      <div class="dashboard-container">
        <div class="welcome-section">
          <h1>Вітаємо, {{ getCurrentUserFullName() }}!</h1>
          <p>Продовжуйте своє навчання</p>
        </div>

        <div class="stats-grid">
          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Загальний прогрес</mat-card-title>
              <mat-icon class="stat-icon">trending_up</mat-icon>
            </mat-card-header>
            <mat-card-content>
              <mat-progress-bar mode="determinate" [value]="roadmapProgress()"></mat-progress-bar>
              <span class="stat-value">{{ roadmapProgress() }}%</span>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Завдання</mat-card-title>
              <mat-icon class="stat-icon">assignment</mat-icon>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number">{{ pendingHomeworkCount() }}</div>
              <span class="stat-label">в очікувані</span>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Рівень</mat-card-title>
              <mat-icon class="stat-icon">school</mat-icon>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number">{{ currentLevel() }}</div>
              <span class="stat-label">поточний рівень</span>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Наступні завдання</mat-card-title>
              <mat-icon class="stat-icon">event</mat-icon>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number">{{ upcomingTasks().length }}</div>
              <span class="stat-label">завдань</span>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="quick-actions">
          <mat-card class="actions-card">
            <mat-card-header>
              <mat-card-title>Швидкі дії</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="action-buttons">
                <button mat-raised-button color="primary" (click)="startNextLesson()">
                  <mat-icon>play_arrow</mat-icon>
                  Почати наступний урок
                </button>
                <button mat-stroked-button (click)="viewPendingHomework()">
                  <mat-icon>assignment</mat-icon>
                  Переглянути завдання
                </button>
                <button mat-stroked-button (click)="viewResources()">
                  <mat-icon>folder</mat-icon>
                  Навчальні матеріали
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="recent-activity">
          <mat-card class="activity-card">
            <mat-card-header>
              <mat-card-title>Остання діяльність</mat-card-title>
              <mat-icon class="activity-icon">timeline</mat-icon>
            </mat-card-header>
            <mat-card-content>
              @for (activity of recentActivities(); track activity.date) {
                <div class="activity-item">
                  <mat-icon>{{ activity.icon }}</mat-icon>
                  <div class="activity-content">
                    <div class="activity-title">{{ activity.description }}</div>
                    <div class="activity-date">{{ activity.date | date:'short' }}</div>
                  </div>
                </div>
              }
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    }`,
  styles: [`
    .dashboard-home {
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-section {
      margin-bottom: 2rem;
    }

    .welcome-section h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .welcome-section p {
      font-size: 1.1rem;
      color: #666;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      height: 100%;
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .stat-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      color: #667eea;
    }

    .stat-content h3 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      color: #333;
    }

    .stat-content p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .actions-section {
      margin-bottom: 3rem;
    }

    .actions-section h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #333;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .action-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1.5rem;
      min-height: 120px;
    }

    .action-button mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .next-steps-section,
    .activity-section {
      margin-bottom: 2rem;
    }

    .next-steps-section h2,
    .activity-section h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #333;
    }

    .steps-list {
      display: grid;
      gap: 1rem;
    }

    .step-card {
      transition: transform 0.2s ease;
    }

    .step-card:hover {
      transform: translateY(-2px);
    }

    .step-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .step-icon {
      color: #667eea;
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .step-content h4 {
      margin: 0 0 0.25rem 0;
      font-weight: 600;
      color: #333;
    }

    .step-content p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .activity-card {
      margin-bottom: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      color: #667eea;
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    .activity-content p {
      margin: 0 0 0.25rem 0;
      color: #333;
    }

    .activity-content small {
      color: #666;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .stats-grid,
      .actions-grid {
        grid-template-columns: 1fr;
      }

      .welcome-section h1 {
        font-size: 2rem;
      }

      .action-button {
        min-height: 100px;
        padding: 1rem;
      }
    }
  `]
})
export class DashboardHomeComponent {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = computed(() => this.authService.getCurrentUser());
  dashboardStats = signal<DashboardStats | null>(null);
  recentActivities = signal<RecentActivity[]>([]);
  isLoading = signal(true);

  constructor() {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    const user = this.currentUser();
    if (!user) return;

    this.isLoading.set(true);
    
    // Load dashboard stats
    this.apiService.getDashboardStats(user.id).subscribe({
      next: (stats) => {
        this.dashboardStats.set(stats);
        this.recentActivities.set(stats.recentActivities);
        this.isLoading.set(false);
      },
      error: () => {
        console.error('Failed to load dashboard stats');
        this.isLoading.set(false);
        // Set default recent activities on error
        this.recentActivities.set([
          {
            icon: 'assignment_turned_in',
            description: 'Завдання "Українська граматика" відправлено',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          },
          {
            icon: 'school',
            description: 'Урок "Алфавіт та вимова" завершено',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          },
          {
            icon: 'book',
            description: 'Почато вивчення "Основи граматики"',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
          }
        ]);
      }
    });
  }

  getCurrentUserFullName(): string {
    const user = this.currentUser();
    return user?.fullName || 'Студент';
  }

  roadmapProgress = computed(() => {
    const stats = this.dashboardStats();
    return stats?.roadmapProgress || 0;
  });

  pendingHomeworkCount = computed(() => {
    const stats = this.dashboardStats();
    return stats?.pendingHomeworkCount || 0;
  });

  currentLevel = computed(() => {
    const stats = this.dashboardStats();
    return stats?.currentLevel || 1;
  });

  upcomingTasks = computed(() => {
    const stats = this.dashboardStats();
    return stats?.upcomingTasks || [];
  });

  startNextLesson(): void {
    this.router.navigate(['/dashboard/roadmap']);
  }

  viewPendingHomework(): void {
    this.router.navigate(['/dashboard/homework']);
  }

  viewResources(): void {
    this.router.navigate(['/dashboard/resources']);
  }

  getTaskIcon(task: string): string {
    if (task.toLowerCase().includes('урок')) return 'school';
    if (task.toLowerCase().includes('вправа')) return 'assignment';
    if (task.toLowerCase().includes('вивчення')) return 'book';
    return 'event_note';
  }
}
