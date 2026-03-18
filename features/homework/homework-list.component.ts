import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/auth/auth.service';
import { Homework, HomeworkStatus } from '../../shared/models/index';
import { StatusChipComponent } from '../../shared/components/status-chip.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';

@Component({
  selector: 'app-homework-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    StatusChipComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="homework-container">
      <div class="homework-header">
        <h1>Домашні завдання</h1>
        <p>Всі ваші завдання в одному місці</p>
      </div>

      <div class="filters-section">
        <mat-form-field appearance="outline" class="status-filter">
          <mat-label>Статус</mat-label>
          <mat-select (selectionChange)="onStatusFilterChange($event.value)" [value]="selectedStatus()">
            <mat-option value="">Всі завдання</mat-option>
            <mat-option value="pending">В очікуванні</mat-option>
            <mat-option value="completed">Завершені</mat-option>
            <mat-option value="overdue">Протерміновані</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      @if (isLoading()) {
        <app-loading-spinner message="Завантаження домашніх завдань..." />
      } @else if (filteredHomework().length > 0) {
        <div class="homework-grid">
          @for (homework of filteredHomework(); track homework.id) {
            <mat-card class="homework-card" [class]="getHomeworkStatusClass(homework)">
              <mat-card-header>
                <mat-card-title class="homework-title">
                  <mat-icon class="homework-icon">assignment</mat-icon>
                  {{ homework.title }}
                </mat-card-title>
                <app-status-chip [status]="homework.status" />
              </mat-card-header>
              
              <mat-card-content>
                <p class="homework-description">{{ homework.description }}</p>
                
                <div class="homework-meta">
                  <div class="due-date">
                    <mat-icon>event</mat-icon>
                    <span>Термін: {{ homework.dueDate | date:'mediumDate' }}</span>
                  </div>
                </div>

                @if (homework.instructorNotes) {
                  <div class="instructor-notes">
                    <h4>Примітки викладача</h4>
                    <p>{{ homework.instructorNotes }}</p>
                  </div>
                }

                @if (homework.attachments && homework.attachments.length > 0) {
                  <div class="attachments">
                    <h4>Вкладення</h4>
                    @for (attachment of homework.attachments; track attachment.id) {
                      <div class="attachment-item">
                        <mat-icon>attach_file</mat-icon>
                        <span>{{ attachment.originalName || attachment.fileName }}</span>
                        <button mat-icon-button (click)="downloadAttachment(attachment)">
                          <mat-icon>download</mat-icon>
                        </button>
                      </div>
                    }
                  </div>
                }

                @if (homework.submission) {
                  <div class="submission-info">
                    <h4>Відправлено</h4>
                    <p>{{ homework.submission.textResponse }}</p>
                    <small>Дата: {{ homework.submission.submittedAt | date:'medium' }}</small>
                  </div>
                }
              </mat-card-content>

              <mat-card-actions align="end">
                @switch (homework.status) {
                  @case ('pending') {
                    <button mat-stroked-button (click)="viewDetails(homework)">
                      <mat-icon>visibility</mat-icon>
                      Деталі
                    </button>
                    <button mat-raised-button color="primary" (click)="submitHomework(homework)">
                      <mat-icon>send</mat-icon>
                      Відправити
                    </button>
                  }
                  @case ('completed') {
                    <button mat-stroked-button (click)="viewDetails(homework)">
                      <mat-icon>visibility</mat-icon>
                      Переглянути
                    </button>
                  }
                  @case ('overdue') {
                    <button mat-stroked-button (click)="viewDetails(homework)">
                      <mat-icon>visibility</mat-icon>
                      Деталі
                    </button>
                    <button mat-raised-button color="warn" (click)="submitHomework(homework)">
                      <mat-icon>send</mat-icon>
                      Відправити
                    </button>
                  }
                }
              </mat-card-actions>
            </mat-card>
          }
        </div>
      } @else {
        <app-empty-state 
          icon="assignment"
          title="Немає домашніх завдань"
          [description]="getEmptyStateMessage()"
          actionText="Оновити"
          [actionCallback]="() => loadHomework()" />
      }
    </div>
  `,
  styles: [`
    .homework-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .homework-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .homework-header h1 {
      font-size: 2.5rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .homework-header p {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }

    .filters-section {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .status-filter {
      min-width: 250px;
    }

    .homework-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .homework-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .homework-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .homework-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .homework-icon {
      font-size: 1.5rem;
    }

    .homework-description {
      margin-bottom: 1rem;
      color: #666;
      line-height: 1.5;
    }

    .homework-meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .due-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      font-size: 0.9rem;
    }

    .instructor-notes {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .instructor-notes h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 0.9rem;
    }

    .instructor-notes p {
      margin: 0;
      font-size: 0.9rem;
      color: #666;
    }

    .attachments {
      margin-bottom: 1rem;
    }

    .attachments h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 0.9rem;
    }

    .attachment-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: #f8f9fa;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    .attachment-item span {
      flex: 1;
      font-size: 0.9rem;
      color: #666;
    }

    .submission-info {
      background: #e8f5e8;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .submission-info h4 {
      margin: 0 0 0.5rem 0;
      color: #2e7d32;
      font-size: 0.9rem;
    }

    .submission-info p {
      margin: 0 0 0.5rem 0;
      font-size: 0.9rem;
      color: #333;
    }

    .submission-info small {
      color: #666;
      font-size: 0.8rem;
    }

    .homework-pending {
      border-left: 4px solid #ff9800;
    }

    .homework-completed {
      border-left: 4px solid #4caf50;
    }

    .homework-overdue {
      border-left: 4px solid #f44336;
    }

    @media (max-width: 768px) {
      .homework-container {
        padding: 1rem;
      }

      .homework-grid {
        grid-template-columns: 1fr;
      }

      .homework-header h1 {
        font-size: 2rem;
      }

      .filters-section {
        flex-direction: column;
        align-items: center;
      }

      .status-filter {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class HomeworkListComponent {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  homework = signal<Homework[]>([]);
  selectedStatus = signal<string>('all');
  isLoading = signal(true);

  currentUser = computed(() => this.authService.getCurrentUser());

  filteredHomework = computed(() => {
    const status = this.selectedStatus();
    const allHomework = this.homework();
    
    if (!status || status === 'all') {
      return allHomework;
    }
    
    return allHomework.filter(hw => hw.status === status);
  });

  constructor() {
    this.loadHomework();
  }

  loadHomework(): void {
    const user = this.currentUser();
    if (!user) return;

    this.isLoading.set(true);
    
    this.apiService.getHomework(user.id).subscribe({
      next: (homework) => {
        this.homework.set(homework);
        this.isLoading.set(false);
      },
      error: () => {
        console.error('Failed to load homework');
        this.isLoading.set(false);
      }
    });
  }

  onStatusFilterChange(status: string): void {
    this.selectedStatus.set(status);
  }

  getHomeworkStatusClass(homework: Homework): string {
    switch (homework.status) {
      case HomeworkStatus.Pending:
        return 'homework-pending';
      case HomeworkStatus.Completed:
        return 'homework-completed';
      case HomeworkStatus.Overdue:
        return 'homework-overdue';
      default:
        return '';
    }
  }

  getEmptyStateMessage(): string {
    const status = this.selectedStatus();
    switch (status) {
      case 'pending':
        return 'У вас немає завдань в очікуванні';
      case 'completed':
        return 'У вас немає завершених завдань';
      case 'overdue':
        return 'У вас немає протермінованих завдань';
      default:
        return 'У вас немає домашніх завдань';
    }
  }

  viewDetails(homework: Homework): void {
    this.router.navigate(['/dashboard/homework', homework.id]);
  }

  submitHomework(homework: Homework): void {
    this.router.navigate(['/dashboard/homework', homework.id]);
  }

  downloadAttachment(attachment: any): void {
    console.log('Download attachment:', attachment.fileName);
    
    // Use the ApiService to make an authenticated request
    const fileName = attachment.fileName || attachment.originalName;
    this.apiService.downloadFile(fileName).subscribe({
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
        // Fallback to direct link if API call fails
        const fallbackUrl = attachment.downloadUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
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
