import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageKeys } from '../enums/core.enum';
import { UserModel } from '../models/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const userStr = localStorage.getItem(LocalStorageKeys.USER_LOGIN);
  const user: UserModel | null = userStr ? JSON.parse(userStr) : null;
  const isAuthRoute = state.url.includes('auth');
 
  if (user && isAuthRoute) {
    router.navigate(['/']);
    return false;
  }

  if (!user && !isAuthRoute) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};
