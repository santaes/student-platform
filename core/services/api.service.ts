import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import {
  User,
  StudentProfile,
  Roadmap,
  RoadmapModule,
  Lesson,
  RoadmapItemStatus,
  HomeworkStatus,
  Homework,
  Submission,
  Resource,
  AuthRequest,
  AuthResponse,
  ApiResponse,
  RegisterRequest,
  LoginRequest,
  DashboardStats,
  RecentActivity
} from '../../shared/models/index';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Authentication
  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      request,
      this.httpOptions
    ).pipe(
      map(response => ({
        success: true,
        data: response,
        message: 'Login successful'
      })),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error.error?.message || 'Login failed');
      })
    );
  }

  register(request: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.apiUrl}/auth/register`,
      request,
      this.httpOptions
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Register error:', error);
        return throwError(() => error.error?.message || 'Registration failed');
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
  }

  // Student Profile
  getStudentProfile(userId: string): Observable<StudentProfile> {
    return this.http.get<StudentProfile>(
      `${this.apiUrl}/users/profile`,
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Get profile error:', error);
        return throwError(() => 'Failed to load profile');
      })
    );
  }

  updateStudentProfile(profile: StudentProfile): Observable<StudentProfile> {
    return this.http.patch<StudentProfile>(
      `${this.apiUrl}/users/profile`,
      profile,
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Update profile error:', error);
        return throwError(() => 'Failed to update profile');
      })
    );
  }

  // Roadmap
  getRoadmap(userId: string): Observable<Roadmap> {
    return this.http.get<Roadmap>(
      `${this.apiUrl}/roadmap`,
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Get roadmap error:', error);
        return throwError(() => 'Failed to load roadmap');
      })
    );
  }

  // Homework
  getHomework(userId: string, status?: HomeworkStatus): Observable<Homework[]> {
    const url = status 
      ? `${this.apiUrl}/homework?status=${status}`
      : `${this.apiUrl}/homework`;
    
    return this.http.get<Homework[]>(
      url,
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Get homework error:', error);
        return throwError(() => 'Failed to load homework');
      })
    );
  }

  getHomeworkById(homeworkId: string): Observable<Homework> {
    return this.http.get<Homework>(
      `${this.apiUrl}/homework/${homeworkId}`,
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Get homework details error:', error);
        return throwError(() => 'Failed to load homework details');
      })
    );
  }

  submitHomework(submission: Submission): Observable<Submission> {
    return this.http.post<Submission>(
      `${this.apiUrl}/homework/${submission.homeworkId}/submit`,
      submission,
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Submit homework error:', error);
        return throwError(() => 'Failed to submit homework');
      })
    );
  }

  markHomeworkCompleted(homeworkId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/homework/${homeworkId}/complete`,
      {},
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(() => undefined),
      catchError(error => {
        console.error('Mark homework completed error:', error);
        return throwError(() => 'Failed to mark homework as completed');
      })
    );
  }

  // Resources
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(
      `${this.apiUrl}/resources`,
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Get resources error:', error);
        return throwError(() => 'Failed to load resources');
      })
    );
  }

  getResourceById(resourceId: string): Observable<Resource> {
    return this.http.get<Resource>(
      `${this.apiUrl}/resources/${resourceId}`,
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Get resource details error:', error);
        return throwError(() => 'Failed to load resource details');
      })
    );
  }

  // Dashboard
  getDashboardStats(userId: string): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(
      `${this.apiUrl}/users/dashboard`,
      {
        headers: this.httpOptions.headers.set('Authorization', `Bearer ${this.getToken()}`)
      }
    ).pipe(
      map(response => response),
      catchError(error => {
        console.error('Get dashboard stats error:', error);
        return throwError(() => 'Failed to load dashboard stats');
      })
    );
  }

  // Helper method to get token
  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }
}
