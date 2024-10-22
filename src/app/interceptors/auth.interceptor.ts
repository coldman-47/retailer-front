import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokens = JSON.parse(<string>localStorage.getItem('token'));
    const { access, refresh } = tokens;
    if (tokens) {
      req = req.clone({
        headers: req.headers.set('Authorization', access),
      });
    }
    return next.handle(req).pipe(
      catchError((error) => {
        return this.authService.refreshToken().pipe(
          switchMap((data: any) => {
            const token = { refresh, access: data.access };
            localStorage.setItem('token', JSON.stringify(token));
            return next.handle(
              req.clone({
                headers: req.headers.set('Authorization', tokens.access),
              })
            );
          })
        );
      })
    );
  }
}
