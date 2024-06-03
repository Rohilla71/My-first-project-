import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router = inject(Router);

    return authService.currentUser$.pipe(
      map(auth => {
        if (auth) return true;
        else {
          router.navigate(['/auth/sign-in'], {queryParams: {returnUrl: state.url}});
          return false
        }
      })
    );

};
