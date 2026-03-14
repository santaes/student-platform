import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { User, NavigationItem } from '../models/index';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatChipsModule,
    RouterModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav 
        #sidenav 
        [mode]="isMobile() ? 'over' : 'side'"
        [opened]="!isMobile()"
        class="sidenav">
        <div class="sidenav-header">
          <h3>Навчальна платформа</h3>
          <button 
            mat-icon-button 
            *ngIf="isMobile()"
            (click)="sidenav.toggle()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        
        <mat-nav-list>
          <a mat-list-item 
             routerLink="/dashboard" 
             routerLinkActive="active"
             (click)="isMobile() && sidenav.toggle()">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Головна</span>
          </a>
          
          <a mat-list-item 
             routerLink="/dashboard/roadmap" 
             routerLinkActive="active"
             (click)="isMobile() && sidenav.toggle()">
            <mat-icon matListItemIcon>timeline</mat-icon>
            <span matListItemTitle>Навчальний план</span>
          </a>
          
          <a mat-list-item 
             routerLink="/dashboard/homework" 
             routerLinkActive="active"
             (click)="isMobile() && sidenav.toggle()">
            <mat-icon matListItemIcon>assignment</mat-icon>
            <span matListItemTitle>Домашні завдання</span>
            <mat-chip 
              *ngIf="pendingHomeworkCount() > 0"
              class="notification-chip">
              {{ pendingHomeworkCount() }}
            </mat-chip>
          </a>
          
          <a mat-list-item 
             routerLink="/dashboard/resources" 
             routerLinkActive="active"
             (click)="isMobile() && sidenav.toggle()">
            <mat-icon matListItemIcon>folder</mat-icon>
            <span matListItemTitle>Ресурси</span>
          </a>
          
          <a mat-list-item 
             routerLink="/dashboard/profile" 
             routerLinkActive="active"
             (click)="isMobile() && sidenav.toggle()">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>Профіль</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar class="toolbar">
          <button 
            mat-icon-button 
            *ngIf="isMobile()"
            (click)="sidenav.toggle()"
            class="menu-button">
            <mat-icon>menu</mat-icon>
          </button>
          
          <span class="toolbar-spacer"></span>
          
          <button 
            mat-icon-button 
            [matMenuTriggerFor]="userMenu"
            class="user-menu-button">
            <mat-icon>account_circle</mat-icon>
          </button>
          
          <mat-menu #userMenu="matMenu" xPosition="before">
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>{{ currentUser()?.fullName }}</span>
            </button>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
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
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 280px;
      background: #f8f9fa;
      border-right: 1px solid #e0e0e0;
    }

    .sidenav-header {
      padding: 1rem;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sidenav-header h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }

    .toolbar {
      background: white;
      border-bottom: 1px solid #e0e0e0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .menu-button {
      margin-right: 1rem;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .user-menu-button {
      margin-left: auto;
    }

    .main-content {
      padding: 2rem;
      background: #fafafa;
      min-height: calc(100vh - 64px);
    }

    .active {
      background: #e3f2fd;
      color: #1976d2;
    }

    .notification-chip {
      background: #f44336;
      color: white;
      font-size: 0.75rem;
      height: 20px;
      min-width: 20px;
      line-height: 20px;
      padding: 0 6px;
      border-radius: 10px;
      margin-left: auto;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 1rem;
      }
    }
  `]
})
export class NavigationComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  currentUser = computed(() => this.authService.getCurrentUser());
  pendingHomeworkCount = computed(() => {
    // This would typically come from a service
    return 3; // Mock value for now
  });

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
