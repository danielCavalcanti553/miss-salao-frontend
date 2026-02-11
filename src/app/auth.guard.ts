import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './service/auth.service';



export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);


  return auth.user$.pipe(
    map(user => {
      if (user) { return true; }
      router.navigateByUrl('/login');
      return false;
    })
  );
};
