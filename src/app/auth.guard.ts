// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public authentication: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // check first if the user is logged in
    const isLoggedIn = this.authentication.getUserId() !== undefined;
    if (!isLoggedIn) {
      // navigate to the sign in page if the user is not logged in
      this.router.navigate(['/sign-in']);
      // TODO delete in Production
      console.log('AuthGuard: User is not logged in');
    }
    return isLoggedIn;
  }
}
