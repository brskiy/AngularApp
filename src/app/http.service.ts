import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {options} from './app.module';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}







  post(url: string, data: {}) {
    return this.http.post(url,JSON.stringify(data),{headers:{"Content-Type":" application/json"}})
      .subscribe(response => console.log(response))
  }
}
