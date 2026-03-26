import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(' AuthInterceptor: Intercepting request:', req.url);
    const token = this.authService.getToken();
    console.log(' AuthInterceptor: Token exists:', !!token);

    if (token) {
      console.log(' AuthInterceptor: Token found, adding to request:', req.url);
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log(' AuthInterceptor: Headers after adding token:', authReq.headers.keys());
      return next.handle(authReq);
    }

    console.log(' AuthInterceptor: No token found for request:', req.url);
    return next.handle(req);
  }
}
