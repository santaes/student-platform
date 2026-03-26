import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';

export const authResolver: ResolveFn<boolean> = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wait for auth to be checked
  if (!authService.isAuthChecked()) {
    // If auth is not checked, redirect to a loading page
    router.navigate(['/public']);
    return of(false);
  }

  // If auth is checked, proceed with routing
  return of(true);
};
