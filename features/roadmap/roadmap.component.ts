import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/auth/auth.service';
import { Roadmap, RoadmapModule, Lesson, RoadmapItemStatus } from '../../shared/models/index';
import { StatusChipComponent } from '../../shared/components/status-chip.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatExpansionModule,
    MatListModule,
    StatusChipComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="roadmap-container">
      @if (isLoading()) {
        <app-loading-spinner message="Завантаження навчального плану..." />
      } @else {
        @let rm = roadmap();
        @if (rm) {
          <div class="roadmap-content">
            <div class="roadmap-header">
              <h1>Навчальний план</h1>
              <p>{{ rm.description }}</p>
            </div>

            <div class="roadmap-overview">
              <mat-card class="overview-card">
                <mat-card-content>
                  <div class="progress-section">
                    <h3>Загальний прогрес</h3>
                    <mat-progress-bar 
                      mode="determinate" 
                      [value]="getOverallProgress(rm)" 
                      class="progress-bar" />
                    <p class="progress-text">{{ getOverallProgress(rm) }}% завершено</p>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>

            <div class="modules-container">
              @for (module of rm.modules; track module.id) {
                <mat-card class="module-card" [class]="getModuleStatusClass(module)">
                  <mat-card-header>
                    <mat-card-title>{{ module.title }}</mat-card-title>
                    <mat-card-subtitle>{{ module.description }}</mat-card-subtitle>
                  </mat-card-header>
                  
                  <mat-card-content>
                    <div class="module-progress">
                      <mat-progress-bar 
                        mode="determinate" 
                        [value]="getModuleProgress(module)" 
                        class="progress-bar" />
                      <span class="progress-text">{{ getModuleProgress(module) }}%</span>
                    </div>

                    <mat-accordion class="lessons-accordion">
                      @for (lesson of module.lessons; track lesson.id) {
                        <mat-expansion-panel>
                          <mat-expansion-panel-header>
                            <mat-panel-title>
                              <div class="lesson-header">
                                <mat-icon class="lesson-icon">book</mat-icon>
                                <span class="lesson-title">{{ lesson.title }}</span>
                                <app-status-chip [status]="lesson.status" />
                              </div>
                            </mat-panel-title>
                          </mat-expansion-panel-header>
                          
                          <div class="lesson-content">
                            <p class="lesson-description">{{ lesson.description }}</p>
                            
                            @if (lesson.estimatedHours) {
                              <div class="lesson-meta">
                                <mat-icon>schedule</mat-icon>
                                <span>Оцінний час: {{ lesson.estimatedHours }} год</span>
                              </div>
                            }

                            <div class="lesson-actions">
                              @if (lesson.status === RoadmapItemStatus.Locked) {
                                <button mat-stroked-button disabled>
                                  <mat-icon>lock</mat-icon>
                                  Заблоковано
                                </button>
                              } @else if (lesson.status === RoadmapItemStatus.Available) {
                                <button mat-raised-button color="primary" (click)="startLesson(lesson)">
                                  <mat-icon>play_arrow</mat-icon>
                                  Почати
                                </button>
                              } @else if (lesson.status === RoadmapItemStatus.InProgress) {
                                <button mat-raised-button color="accent" (click)="continueLesson(lesson)">
                                  <mat-icon>continue</mat-icon>
                                  Продовжити
                                </button>
                              } @else if (lesson.status === RoadmapItemStatus.Completed) {
                                <button mat-stroked-button disabled>
                                  <mat-icon>check_circle</mat-icon>
                                  Завершено
                                </button>
                              }
                            </div>
                          </div>
                        </mat-expansion-panel>
                      }
                    </mat-accordion>
                  </mat-card-content>
                </mat-card>
              }
            </div>
          </div>
        } @else {
          <app-empty-state 
            icon="school"
            title="Немає навчального плану"
            description="Наразі для вас не налаштовано навчальний план"
            actionText="Зв'язатися з викладачем"
            [actionCallback]="contactInstructor" />
        }
      }
    </div>
  `,
  styles: [`
    .roadmap-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .roadmap-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .roadmap-header h1 {
      font-size: 2.5rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .roadmap-header p {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }

    .roadmap-overview {
      margin-bottom: 2rem;
    }

    .overview-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .progress-section {
      text-align: center;
    }

    .progress-section h3 {
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .progress-text {
      font-size: 1.2rem;
      font-weight: 600;
      margin-left: 1rem;
    }

    .modules-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .module-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .module-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .module-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .module-icon {
      font-size: 1.5rem;
    }

    .module-progress {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .module-progress span {
      font-weight: 600;
      min-width: 3rem;
      text-align: right;
    }

    .module-description {
      margin-bottom: 1rem;
      color: #666;
      line-height: 1.5;
    }

    .lessons-accordion {
      margin-top: 1rem;
    }

    .lesson-panel {
      border: 1px solid #e0e0e0;
      margin-bottom: 0.5rem;
    }

    .lesson-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .lesson-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .lesson-title {
      font-weight: 500;
    }

    .lesson-details {
      padding: 1rem 0;
    }

    .lesson-description {
      margin-bottom: 1rem;
      color: #666;
    }

    .lesson-content {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .lesson-content h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .lesson-duration {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      margin-bottom: 1rem;
    }

    .lesson-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .module-completed {
      border-left: 4px solid #4caf50;
    }

    .module-in-progress {
      border-left: 4px solid #ff9800;
    }

    .module-available {
      border-left: 4px solid #2196f3;
    }

    .module-locked {
      border-left: 4px solid #9e9e9e;
    }

    @media (max-width: 768px) {
      .roadmap-container {
        padding: 1rem;
      }

      .modules-container {
        grid-template-columns: 1fr;
      }

      .roadmap-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class RoadmapComponent {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  roadmap = signal<Roadmap | null>(null);
  isLoading = signal(true);
  RoadmapItemStatus = RoadmapItemStatus;

  currentUser = computed(() => this.authService.getCurrentUser());

  constructor() {
    this.loadRoadmap();
  }

  private loadRoadmap(): void {
    const user = this.currentUser();
    if (!user) return;

    this.isLoading.set(true);
    
    this.apiService.getRoadmap(user.id).subscribe({
      next: (roadmap) => {
        this.roadmap.set(roadmap);
        this.isLoading.set(false);
      },
      error: () => {
        console.error('Failed to load roadmap');
        this.isLoading.set(false);
      }
    });
  }

  getOverallProgress(roadmap: Roadmap): number {
    if (!roadmap || !roadmap.modules || roadmap.modules.length === 0) {
      return 0;
    }

    const totalLessons = roadmap.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessons = roadmap.modules.reduce((sum, module) => 
      sum + module.lessons.filter(lesson => lesson.status === RoadmapItemStatus.Completed).length, 0
    );

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  }

  getModuleProgress(module: RoadmapModule): number {
    if (!module.lessons || module.lessons.length === 0) {
      return 0;
    }

    const completedCount = module.lessons.filter(lesson => lesson.status === RoadmapItemStatus.Completed).length;
    return Math.round((completedCount / module.lessons.length) * 100);
  }

  getModuleStatusClass(module: RoadmapModule): string {
    const progress = this.getModuleProgress(module);
    if (progress === 100) return 'module-completed';
    if (progress > 0 && progress < 100) return 'module-in-progress';
    if (progress === 0) return 'module-available';
    return 'module-locked';
  }

  startLesson(lesson: Lesson): void {
    console.log('Starting lesson:', lesson.title);
    // In a real app, this would navigate to the lesson detail page or start the lesson
    // For now, we'll just update the lesson status
    this.updateLessonStatus(lesson, RoadmapItemStatus.InProgress);
  }

  continueLesson(lesson: Lesson): void {
    console.log('Continuing lesson:', lesson.title);
    // In a real app, this would navigate to the lesson detail page
    // For now, we'll just log the action
  }

  private updateLessonStatus(lesson: Lesson, status: RoadmapItemStatus): void {
    const currentRoadmap = this.roadmap();
    if (!currentRoadmap) return;

    // Update lesson status in the roadmap
    const updatedRoadmap = { ...currentRoadmap };
    for (const module of updatedRoadmap.modules) {
      for (const lessonItem of module.lessons) {
        if (lessonItem.id === lesson.id) {
          lessonItem.status = status;
          break;
        }
      }
    }

    this.roadmap.set(updatedRoadmap);
  }

  contactInstructor(): void {
    console.log('Contact instructor');
    // In a real app, this would open a contact form or email client
  }
}
