import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-container" [class.inline]="inline()">
      <mat-progress-spinner 
        [mode]="mode()"
        [diameter]="diameter()"
        [strokeWidth]="strokeWidth()">
      </mat-progress-spinner>
      @if (message()) {
        <p class="loading-message">{{ message() }}</p>
      }
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      gap: 1rem;
    }

    .loading-container.inline {
      padding: 1rem;
      flex-direction: row;
    }

    .loading-message {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
      text-align: center;
    }

    .loading-container.inline .loading-message {
      text-align: left;
    }
  `]
})
export class LoadingSpinnerComponent {
  message = input<string>('');
  mode = input<'determinate' | 'indeterminate'>('indeterminate');
  diameter = input<number>(40);
  strokeWidth = input<number>(4);
  inline = input<boolean>(false);
}
