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

  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('currentUser');

      if (token && user) {
        const userObj = JSON.parse(user);
        this.currentUserSubject.next(userObj);
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.apiService.login({ email, password }).pipe(
      tap(response => {
        if (response.success) {
          // Save token and user data to localStorage
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authToken', response.data.access_token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
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
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authToken', response.data.access_token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
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
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }
}
