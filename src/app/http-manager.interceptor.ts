import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpManagerInterceptor implements HttpInterceptor {

  constructor(private authService: UserAuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.get('No-Auth') === 'True') {
      return next.handle(request.clone());
    }
    const token = this.authService.getToken();
    request = this.addToken(request, token);
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['/']);
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        }
        return throwError(err);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
