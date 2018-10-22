import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(public http: HttpClient) { }

  listBooks(options = {}) {
    return this.http.get(`${environment.endpoint}book`, {
      params: options
    });
  }

  delete(id) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': token, 'Content-Type': 'application/json'});
    
    return this.http.delete(`${environment.endpoint}book/${id}`, {
      headers: headers
    });
  }

  update(id, body) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': token, 'Content-Type': 'application/json'});
    
    return this.http.put(`${environment.endpoint}book/${id}`, body, {
      headers: headers
    });
  }

  create(body) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': token, 'Content-Type': 'application/json'});
    
    return this.http.post(`${environment.endpoint}book`, body, {
      headers: headers
    });
  }
}
