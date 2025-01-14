import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageKeys } from '../enums/core.enum';
import { catchError, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const alertSer: ToastrService = inject(ToastrService);
  
  let token: string = '';
  const local = localStorage.getItem(LocalStorageKeys.USER_LOGIN);
  if(local){
    token = JSON.parse(local).token; 
  }
  // Clone the request to add the Authorization header if needed
  const isAuthEndpoint: boolean = req.url.includes('/auth');
  const modifiedReq: HttpRequest<any> = isAuthEndpoint ? req : req.clone({
    setHeaders: { Authorization: token }
  });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 0) {
        alertSer.error('Unable to connect to the server');
      } else if (error.status === HttpStatusCode.Forbidden) {
        alertSer.error('Session will be expired');
        localStorage.removeItem(LocalStorageKeys.USER_LOGIN);
        // Redirect to login page
        window.location.href = '/auth';
      } else {
        alertSer.error(error.error.message || 'Something went wrong');
      }


      return throwError(() => error);
    })
  );
};
