import { Routes } from '@angular/router';
import { guestGuard, authGuard } from '../core/guards/auth.guard';
import { LandingComponent } from '../features/public/landing.component';
import { LoginComponent } from '../features/auth/login.component';
import { RegisterComponent } from '../features/auth/register.component';
import { NavigationComponent } from '../shared/components/navigation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/public',
    pathMatch: 'full'
  },
  {
    path: 'public',
    component: LandingComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [guestGuard]
      }
    ]
  },
  {
    path: 'dashboard',
    component: NavigationComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('../features/dashboard/dashboard-home.component').then(m => m.DashboardHomeComponent)
      },
      {
        path: 'roadmap',
        loadComponent: () => import('../features/roadmap/roadmap.component').then(m => m.RoadmapComponent)
      },
      {
        path: 'homework',
        loadComponent: () => import('../features/homework/homework-list.component').then(m => m.HomeworkListComponent)
      },
      {
        path: 'homework/:id',
        loadComponent: () => import('../features/homework/homework-details.component').then(m => m.HomeworkDetailsComponent)
      },
      {
        path: 'resources',
        loadComponent: () => import('../features/resources/resources.component').then(m => m.ResourcesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('../features/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'chat',
        loadComponent: () => import('../features/chat/chat.component').then(m => m.ChatComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/public'
  }
];
