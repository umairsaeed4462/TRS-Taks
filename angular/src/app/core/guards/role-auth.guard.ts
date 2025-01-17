import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../enums/core.enum';

export const roleAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  
  const userStr = localStorage.getItem(LocalStorageKeys.USER_LOGIN);
  let userRole = null;
  if(userStr) userRole = JSON.parse(userStr).role;

  const isUserRoute = state.url.includes('user');
  const isAdminRoute = state.url.includes('admin');

  // Redirect if the user's role doesn't match the route they are trying to access
  if ((isUserRoute && userRole !== 'user') || (isAdminRoute && userRole !== 'admin')) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
