import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Token } from '../models/token.interface';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

let isRefreshing = false;

export const AuthInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem(Token.ACCESS_TOKEN);
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(req).pipe(
    catchError<any, any>((error) => {
      if (isRefreshing) {
        return next(req);
      }

      if (error.status === 401) {
        const accessToken = localStorage.getItem(Token.ACCESS_TOKEN) as string;
        const refreshToken = localStorage.getItem(
          Token.REFRESH_TOKEN
        ) as string;

        isRefreshing = true;

        return authService.refreshToken({ accessToken, refreshToken }).pipe(
          switchMap((data) => {
            localStorage.setItem(Token.ACCESS_TOKEN, data.accessToken);
            localStorage.setItem(Token.REFRESH_TOKEN, data.refreshToken);

            isRefreshing = false;

            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${data.accessToken}`,
              },
            });

            return next(req);
          }),
          catchError((error) => {
            isRefreshing = false;

            if (error.status === 401) {
              router.navigate(['/auth']);
            }

            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
