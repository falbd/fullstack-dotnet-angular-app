import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['expectedRoles'] as string[];
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  const hasRole = expectedRoles.some(role => authService.hasRole(role));
  if (!hasRole) {
    alert('Access Denied');
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
