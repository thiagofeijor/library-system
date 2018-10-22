import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(public http: HttpClient) { }

  auth() {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': token, 'Content-Type': 'application/json'});

    return this.http.get(`${environment.endpoint}auth`, {
      headers: headers
    });
  }

  login(form) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    return this.http.post(`${environment.endpoint}auth/login`, form, {
      headers: headers
    });
  }

}
