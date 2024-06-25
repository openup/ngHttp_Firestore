import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { SpinnerLoaderService } from './spinner.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(MatSnackBar);
  const loader = inject(SpinnerLoaderService);

  loader.show();
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        snackBar.open(err.message, '❌');
      }

      return throwError(() => err);
    }),
    finalize(() => {
      loader.hide();
    })
  );
};