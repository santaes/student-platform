import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RoadmapItemStatus, HomeworkStatus } from '../models/index';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  template: `
    <mat-chip
      [class]="'status-chip ' + getStatusClass()">
      {{ getStatusText() }}
    </mat-chip>
  `,
  styles: [`
    .status-chip {
      font-weight: 500;
      text-transform: uppercase;
      font-size: 0.75rem;
    }

    .status-locked {
      background-color: #e0e0e0;
      color: #666;
    }

    .status-available {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .status-in-progress {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .status-completed {
      background-color: #e8f5e8;
      color: #2e7d32;
    }

    .status-pending {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .status-overdue {
      background-color: #ffebee;
      color: #d32f2f;
    }

    .status-downloadable {
      background-color: #e3f2fd;
      color: #1976d2;
    }
  `]
})
export class StatusChipComponent {
  status = input<RoadmapItemStatus | HomeworkStatus | string>('');

  private statusValue = computed(() => this.status());

  getStatusClass(): string {
    const status = this.statusValue();
    switch (status) {
      case RoadmapItemStatus.Locked:
        return 'status-locked';
      case RoadmapItemStatus.Available:
        return 'status-available';
      case RoadmapItemStatus.InProgress:
        return 'status-in-progress';
      case RoadmapItemStatus.Completed:
        return 'status-completed';
      case HomeworkStatus.Pending:
        return 'status-pending';
      case HomeworkStatus.Overdue:
        return 'status-overdue';
      case HomeworkStatus.Downloadable:
        return 'status-downloadable';
      default:
        return 'status-available';
    }
  }

  getStatusText(): string {
    const status = this.statusValue();
    switch (status) {
      case RoadmapItemStatus.Locked:
        return 'Заблоковано';
      case RoadmapItemStatus.Available:
        return 'Доступно';
      case RoadmapItemStatus.InProgress:
        return 'В процесі';
      case RoadmapItemStatus.Completed:
        return 'Завершено';
      case HomeworkStatus.Pending:
        return 'Очікує';
      case HomeworkStatus.Completed:
        return 'Завершено';
      case HomeworkStatus.Overdue:
        return 'Прострочено';
      case HomeworkStatus.Downloadable:
        return 'Завантажуване';
      default:
        return status;
    }
  }
}
