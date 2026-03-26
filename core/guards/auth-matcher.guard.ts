import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authMatcher: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🔍 AuthMatcher: Checking route match');
  console.log('🔍 AuthMatcher: Is logged in:', authService.isLoggedIn());

  // If user is logged in, allow dashboard routes
  if (authService.isLoggedIn()) {
    console.log('🔍 AuthMatcher: User authenticated, allowing route');
    return true;
  }

  // If user is not logged in, redirect to public and prevent match
  console.log('🔍 AuthMatcher: User not authenticated, redirecting to public');
  router.navigate(['/public']);
  return false;
};

export const guestMatcher: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🔍 GuestMatcher: Checking route match');
  console.log('🔍 GuestMatcher: Is logged in:', authService.isLoggedIn());

  // If user is not logged in, allow public/auth routes
  if (!authService.isLoggedIn()) {
    console.log('🔍 GuestMatcher: User not authenticated, allowing route');
    return true;
  }

  // If user is logged in, redirect to dashboard and prevent match
  console.log('🔍 GuestMatcher: User authenticated, redirecting to dashboard');
  router.navigate(['/dashboard']);
  return false;
};
