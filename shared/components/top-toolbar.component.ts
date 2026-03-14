import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-top-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule, TranslateModule],
  template: `
    <mat-toolbar class="top-toolbar">
      <div class="toolbar-left">
        <button mat-icon-button routerLink="/dashboard">
          <mat-icon>home</mat-icon>
        </button>
        <span class="brand">{{ 'app.title' | translate }}</span>
      </div>
      <div class="toolbar-right">
        <button mat-icon-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item routerLink="/dashboard/profile">
            <mat-icon>person</mat-icon>
            <span>{{ 'nav.profile' | translate }}</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>{{ 'nav.logout' | translate }}</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .top-toolbar {
      background: #fff;
      border-bottom: 1px solid #e0e0e0;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
    }
    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .brand {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
    }
    .toolbar-right {
      display: flex;
      align-items: center;
    }
  `]
})
export class TopToolbarComponent {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
