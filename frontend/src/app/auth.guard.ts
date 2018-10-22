import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router,
    private appService: AppService,
  ) { }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    let token = localStorage.getItem('token');
    
    if (token) {
      return this.appService.auth().toPromise().then(item => {
        return Promise.resolve(true);
      }).catch(() => {
        this.router.navigate(['/login']);
        return Promise.reject(FindValueSubscriber);
      });
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}