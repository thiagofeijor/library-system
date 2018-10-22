import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private appService: AppService,
  ) { }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    return this.hasPermission();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return this.hasPermission();
  }

  hasPermission() {
    let token = localStorage.getItem('token');
    
    if (token) {
      return this.appService.auth().toPromise().then(item => {
        return Promise.resolve(true);
      }).catch(() => {
        this.router.navigate(['/login']);
        return Promise.reject(false);
      });
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}