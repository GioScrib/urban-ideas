import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  canActivate(): boolean {
    const hasToken = typeof localStorage !== 'undefined' && !!localStorage.getItem('auth_token');
    if(!hasToken) {
      console.log("AuthGuard dice: no token");
      this.router.navigate(['/auth']).then(() => null);
    }
    console.log("AuthGuard dice: " + hasToken);
    return hasToken;
    }

}

