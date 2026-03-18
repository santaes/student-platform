import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/auth/auth.service';
import { Homework, HomeworkStatus } from '../../shared/models/index';
import { StatusChipComponent } from '../../shared/components/status-chip.component';

@Component({
  selector: 'app-homework-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    StatusChipComponent
  ],
  template: `
    <div class="homework-details-container">
      @if (isLoading()) {
        <div class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Завантаження завдання...</p>
        </div>
      } @else {
        @let hw = homework();
        @if (hw) {
          <div class="homework-content">
            <mat-card class="homework-card">
              <mat-card-header>
                <mat-card-title class="homework-title">
                  <mat-icon class="homework-icon">assignment</mat-icon>
                  {{ hw.title }}
                </mat-card-title>
                <button mat-icon-button (click)="goBack()">
                  <mat-icon>arrow_back</mat-icon>
                </button>
              </mat-card-header>
              
              <mat-card-content>
                <div class="homework-description">
                  <h3>Опис завдання</h3>
                  <p>{{ hw.description }}</p>
                </div>

                <div class="homework-meta">
                  <div class="meta-item">
                    <mat-icon>event</mat-icon>
                    <div>
                      <strong>Термін здачі:</strong>
                      <p>{{ hw.dueDate | date:'fullDate' }}</p>
                    </div>
                  </div>

                  @if (hw.estimatedHours) {
                    <div class="meta-item">
                      <mat-icon>schedule</mat-icon>
                      <div>
                        <strong>Оцінний час:</strong>
                        <p>{{ hw.estimatedHours }} годин</p>
                      </div>
                    </div>
                  }

                  <div class="meta-item">
                    <mat-icon>flag</mat-icon>
                    <div>
                      <strong>Статус:</strong>
                      <app-status-chip [status]="hw.status" />
                    </div>
                  </div>
                </div>

                @if (hw.instructorNotes) {
                  <div class="instructor-notes">
                    <h3>Примітки викладача</h3>
                    <div class="notes-content">
                      <mat-icon class="notes-icon">note</mat-icon>
                      <p>{{ hw.instructorNotes }}</p>
                    </div>
                  </div>
                }

                @if (hw.attachments && hw.attachments.length > 0) {
                  <div class="attachments-section">
                    <h3>Вкладення</h3>
                    <div class="attachments-list">
                      @for (attachment of hw.attachments; track attachment.id) {
                        <div class="attachment-item">
                          <mat-icon class="attachment-icon">attach_file</mat-icon>
                          <span class="attachment-name">{{ attachment.originalName || attachment.fileName }}</span>
                          <button mat-stroked-button (click)="downloadAttachment(attachment)">
                            <mat-icon>download</mat-icon>
                            Завантажити
                          </button>
                        </div>
                      }
                    </div>
                  </div>
                }

                @if (hw.submission) {
                  <div class="submission-section">
                    <h3>Відправлена робота</h3>
                    <div class="submission-content">
                      <div class="submission-text">
                        <p>{{ hw.submission.textResponse }}</p>
                      </div>
                      <div class="submission-meta">
                        <mat-icon>check_circle</mat-icon>
                        <span>Відправлено: {{ hw.submission.submittedAt | date:'fullDate' }}</span>
                      </div>
                    </div>
                  </div>
                }
              </mat-card-content>

              <mat-card-actions align="end">
                @if (hw.status !== 'completed' && hw.status !== 'overdue') {
                  <button mat-raised-button color="primary" (click)="submitHomework()">
                    <mat-icon>send</mat-icon>
                    Відправити роботу
                  </button>
                }
                
                @if (hw.status === 'completed') {
                  <button mat-stroked-button (click)="viewSubmission()">
                    <mat-icon>visibility</mat-icon>
                    Переглянути роботу
                  </button>
                }
              </mat-card-actions>
            </mat-card>
          </div>
        } @else {
          <div class="error-container">
            <mat-icon class="error-icon">error</mat-icon>
            <h2>Завдання не знайдено</h2>
            <p>На жаль, завдання, яке ви шукаєте, не існує або недоступне.</p>
            <button mat-raised-button color="primary" (click)="goBack()">
              <mat-icon>arrow_back</mat-icon>
              Повернутися до списку
            </button>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .homework-details-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      gap: 1rem;
    }

    .homework-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .homework-card .mat-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .homework-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .homework-icon {
      font-size: 1.8rem;
      color: #666;
    }

    .homework-description {
      margin-bottom: 2rem;
    }

    .homework-description h3 {
      margin-bottom: 1rem;
      color: #333;
    }

    .homework-description p {
      line-height: 1.6;
      color: #666;
    }

    .homework-meta {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .meta-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .meta-item mat-icon {
      font-size: 1.5rem;
      color: #666;
      margin-top: 0.25rem;
    }

    .meta-item strong {
      color: #333;
      display: block;
      margin-bottom: 0.25rem;
    }

    .meta-item p {
      color: #666;
      margin: 0;
    }

    .instructor-notes {
      margin-bottom: 2rem;
    }

    .instructor-notes h3 {
      margin-bottom: 1rem;
      color: #333;
    }

    .notes-content {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: #fff3cd;
      border-radius: 8px;
      border-left: 4px solid #ffc107;
    }

    .notes-icon {
      font-size: 1.5rem;
      color: #856404;
      margin-top: 0.25rem;
    }

    .notes-content p {
      color: #856404;
      line-height: 1.6;
      margin: 0;
    }

    .attachments-section {
      margin-bottom: 2rem;
    }

    .attachments-section h3 {
      margin-bottom: 1rem;
      color: #333;
    }

    .attachments-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .attachment-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .attachment-icon {
      font-size: 1.5rem;
      color: #666;
    }

    .attachment-name {
      flex: 1;
      color: #333;
    }

    .submission-section {
      margin-bottom: 2rem;
    }

    .submission-content {
      padding: 1rem;
      background: #d4edda;
      border-radius: 8px;
      border-left: 4px solid #28a745;
    }

    .submission-text {
      margin-bottom: 1rem;
    }

    .submission-text p {
      color: #155724;
      line-height: 1.6;
      margin: 0;
    }

    .submission-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #155724;
      font-size: 0.9rem;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      text-align: center;
      gap: 1rem;
    }

    .error-icon {
      font-size: 4rem;
      color: #dc3545;
    }

    .error-container h2 {
      color: #333;
      margin: 0;
    }

    .error-container p {
      color: #666;
      max-width: 400px;
    }

    @media (max-width: 768px) {
      .homework-details-container {
        padding: 1rem;
      }

      .homework-meta {
        gap: 0.5rem;
      }

      .meta-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .attachment-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .attachment-item button {
        width: 100%;
      }
    }
  `]
})
export class HomeworkDetailsComponent {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  homework = computed(() => {
    const hw = this.homeworkSignal();
    return hw;
  });
  isLoading = signal(true);

  homeworkSignal = signal<Homework | null>(null);

  currentUser = computed(() => this.authService.getCurrentUser());

  constructor() {
    this.loadHomework();
  }

  private loadHomework(): void {
    const homeworkId = this.route.snapshot.paramMap.get('id');
    if (!homeworkId) {
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    
    // In a real app, this would call the API to get the homework details
    // For now, we'll simulate loading
    setTimeout(() => {
      this.homeworkSignal.set({
        id: homeworkId,
        studentId: '1', // In a real app, this would come from the current user
        title: 'Українська граматика: Дієслова система',
        description: 'Вивчіть основи дієслівної системи української мови, включаючи часові форми, особи та відмінки. Виконайте вправи для закріплення матеріалу.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        estimatedHours: 3,
        status: HomeworkStatus.Pending,
        instructorNotes: 'Зверніть особливу увагу на правильне використання часових форм дієслів у різних контекстах.',
        attachments: [
          {
            id: '1',
            homeworkId: homeworkId,
            fileName: 'ukrainian-verbs.pdf',
            originalName: 'Дієслова система української мови.pdf',
            fileType: 'pdf',
            fileSize: 2048576,
            downloadUrl: '/api/resources/download/ukrainian-verbs.pdf'
          }
        ],
        submission: undefined,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      });
      this.isLoading.set(false);
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/homework']);
  }

  submitHomework(): void {
    console.log('Submitting homework');
    // In a real app, this would open a submission dialog or navigate to submission page
  }

  viewSubmission(): void {
    console.log('Viewing submission');
    // In a real app, this would show the submission details
  }

  downloadAttachment(attachment: any): void {
    console.log('Downloading attachment:', attachment.fileName);
    
    // Use the ApiService to make an authenticated request
    this.apiService.downloadFile(attachment.fileName).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = attachment.originalName || attachment.fileName;
        link.target = '_blank';
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.error('Error downloading file:', error);
        // Fallback to a working PDF URL for demo purposes
        const fallbackUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        const link = document.createElement('a');
        link.href = fallbackUrl;
        link.download = attachment.originalName || attachment.fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }
}
