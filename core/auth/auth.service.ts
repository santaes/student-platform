import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { User, LoginRequest, RegisterRequest } from '../../shared/models/index';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private authChecked = false;
  private isBrowser: boolean;

  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.checkAuthStatus();
  }

  public checkAuthStatus(): void {
    if (this.isBrowser) {
      try {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('currentUser');

        if (token && user) {
          try {
            const userObj = JSON.parse(user);
            // Update BehaviorSubjects to match localStorage
            this.currentUserSubject.next(userObj);
            this.isAuthenticatedSubject.next(true);
          } catch (error) {
            console.error('Error parsing user data:', error);
            this.clearAuthData();
          }
        } else {
          // Ensure BehaviorSubjects match localStorage (both empty)
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
      }
    }
    this.authChecked = true;
  }

  private clearAuthData(): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  login(email: string, password: string): Observable<any> {
    return this.apiService.login({ email, password }).pipe(
      tap(response => {
        if (response.success) {
          // Save token and user data to localStorage
          if (this.isBrowser) {
            try {
              localStorage.setItem('authToken', response.data.access_token);
              localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            } catch (error) {
              console.error('Error saving to localStorage:', error);
            }
          }
          this.currentUserSubject.next(response.data.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  register(fullName: string, email: string, password: string): Observable<any> {
    return this.apiService.register({ fullName, email, password, confirmPassword: password }).pipe(
      tap(response => {
        if (response.success) {
          // Save token and user data to localStorage
          if (this.isBrowser) {
            try {
              localStorage.setItem('authToken', response.data.access_token);
              localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            } catch (error) {
              console.error('Error saving to localStorage:', error);
            }
          }
          this.currentUserSubject.next(response.data.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    this.apiService.logout();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    // First check the BehaviorSubject, if not set, try localStorage
    if (this.currentUserSubject.value) {
      return this.currentUserSubject.value;
    }
    
    if (this.isBrowser) {
      try {
        const user = localStorage.getItem('currentUser');
        if (user) {
          return JSON.parse(user);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    
    return null;
  }

  isLoggedIn(): boolean {
    // Direct localStorage check for immediate result
    if (this.isBrowser) {
      try {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('currentUser');
        return !!(token && user);
      } catch (error) {
        console.error('Error checking localStorage:', error);
        return false;
      }
    }
    return false;
  }

  isAuthChecked(): boolean {
    return this.authChecked;
  }

  getToken(): string | null {
    if (this.isBrowser) {
      try {
        return localStorage.getItem('authToken');
      } catch (error) {
        console.error('Error getting token from localStorage:', error);
        return null;
      }
    }
    return null;
  }
}
