import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwt = authService.getJWT();

  if (jwt) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${jwt}` }
    })
    console.log("[log] jwt.interceptor.ts || appended JWT token to request");
  } else {
    console.log("[log] jwt.interceptor.ts || failed to append JWT token to request");
  }

  return next(req);
};
