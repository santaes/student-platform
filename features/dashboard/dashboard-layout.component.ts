import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../shared/models/models';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    RouterOutlet
  ],
  template: `
    <mat-sidenav-container class="dashboard-container">
      <mat-sidenav mode="side" opened class="sidebar">
        <div class="sidebar-header">
          <mat-icon class="logo-icon">school</mat-icon>
          <h2>Навчальна Панель</h2>
        </div>

        <nav class="sidebar-nav">
          <a mat-button routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <mat-icon>dashboard</mat-icon>
            <span>Головна</span>
          </a>

          <a mat-button routerLink="/dashboard/roadmap" routerLinkActive="active" class="nav-item">
            <mat-icon>timeline</mat-icon>
            <span>Навчальний план</span>
          </a>

          <a mat-button routerLink="/dashboard/homework" routerLinkActive="active" class="nav-item">
            <mat-icon>assignment</mat-icon>
            <span>Домашні завдання</span>
          </a>

          <a mat-button routerLink="/dashboard/resources" routerLinkActive="active" class="nav-item">
            <mat-icon>folder</mat-icon>
            <span>Ресурси</span>
          </a>

          <a mat-button routerLink="/dashboard/profile" routerLinkActive="active" class="nav-item">
            <mat-icon>person</mat-icon>
            <span>Профіль</span>
          </a>
        </nav>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar class="main-toolbar">
          <span class="spacer"></span>

          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
            <span class="user-name">{{ currentUser()?.fullName }}</span>
          </button>

          <mat-menu #userMenu="matMenu">
            <button mat-menu-item routerLink="/dashboard/profile">
              <mat-icon>person</mat-icon>
              <span>Профіль</span>
            </button>
            <button mat-menu-item (click)="logout()">
              <mat-icon>exit_to_app</mat-icon>
              <span>Вийти</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .dashboard-container {
      height: 100vh;
    }

    .sidebar {
      width: 280px;
      background: #f8f9fa;
      border-right: 1px solid #e0e0e0;
    }

    .sidebar-header {
      padding: 1.5rem;
      text-align: center;
      border-bottom: 1px solid #e0e0e0;
      background: white;
    }

    .logo-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
    }

    .sidebar-nav {
      padding: 1rem 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding: 0.75rem 1.5rem;
      text-align: left;
      border-radius: 0;
      font-size: 0.95rem;
      color: #666;
      transition: all 0.2s ease;
    }

    .nav-item:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }

    .nav-item.active {
      background: #667eea;
      color: white;
    }

    .nav-item mat-icon {
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    .main-toolbar {
      background: white;
      color: #333;
      border-bottom: 1px solid #e0e0e0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .spacer {
      flex: 1 1 auto;
    }

    .user-name {
      margin-left: 0.5rem;
      font-weight: 500;
    }

    .main-content {
      padding: 2rem;
      background: #f8f9fa;
      min-height: calc(100vh - 64px);
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 240px;
      }

      .main-content {
        padding: 1rem;
      }
    }
  `]
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  currentUser = computed(() => this.authService.getCurrentUser());

  logout(): void {
    this.authService.logout();
  }
}
