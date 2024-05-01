import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../_kitcoek-services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwt = authService.getJWT();

  if (jwt) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${jwt}` }
    })
    console.log("appended bearer token by jwtInterceptor");
  }else
  {
    console.log("did NOT append bearer token to request by jwtInterceptor");
  }

  return next(req);
};
