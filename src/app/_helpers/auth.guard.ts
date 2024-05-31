import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // return true if JWT exists
  if (authService.getJWT()) {
    return true;
  }

  // If no JWT is there, that means no user is logged in
  // then, redirect to login and return false
  router.navigate(['/login'], undefined);
  return false;
};
