import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
