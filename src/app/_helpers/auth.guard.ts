import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user = authService.getJWT();

  // check if user exists
  if (user) {
    return true;
  }

  router.navigate(['/login'], undefined);
  return false;
};
