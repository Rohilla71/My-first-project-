import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class errorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private router: ActivatedRoute) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           console.log('error from errorInterceptor' + error.status); 
            errorMessage = 'Error:' + error.error.message;
           } else {
             
            if (error.status === 0 || error.status === 404 || error.status === 500 ||
               error.status === 502 || error.status === 504 || navigator.onLine === false) {
                 this.snackBar.open(error.statusText, 'Dismiss')
                console.log('ERROR STATUS CODE', error.status);
                 } else if(error.status === 401) { 
                  this.snackBar.open('Unauthorized Access', 'Dismiss')
                 // this.router.nav
                 }
                  errorMessage = 'Error Code:' + error.status + error.message
                } 
                return throwError(() => new Error(errorMessage)); })
    );
  }
}