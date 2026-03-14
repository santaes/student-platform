import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="empty-state">
      <mat-icon class="empty-icon">{{ icon() }}</mat-icon>
      <h3 class="empty-title">{{ title() }}</h3>
      <p class="empty-description">{{ description() }}</p>
      
      @if (actionText() && actionCallback()) {
        <button 
          mat-raised-button 
          color="primary"
          (click)="handleAction()">
          {{ actionText() }}
        </button>
      }
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 2rem;
      text-align: center;
      background: #fafafa;
      border-radius: 8px;
      border: 2px dashed #e0e0e0;
      min-height: 300px;
    }

    .empty-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #9e9e9e;
      margin-bottom: 1rem;
    }

    .empty-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #424242;
      margin: 0 0 1rem 0;
    }

    .empty-description {
      font-size: 1rem;
      color: #757575;
      margin: 0 0 2rem 0;
      max-width: 400px;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .empty-state {
        padding: 2rem 1rem;
        min-height: 250px;
      }

      .empty-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
      }

      .empty-title {
        font-size: 1.25rem;
      }
    }
  `]
})
export class EmptyStateComponent {
  icon = input<string>('inbox');
  title = input<string>('Немає даних');
  description = input<string>('Тут поки що нічого немає');
  actionText = input<string>('');
  actionCallback = input<(() => void) | undefined>(undefined);

  handleAction(): void {
    const callback = this.actionCallback();
    if (callback) {
      callback();
    }
  }
}
