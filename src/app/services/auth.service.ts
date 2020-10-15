import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }


  isValidToken(){
   console.log(this.http.get("/api/user/account", localStorage.getItem('Token')))
  }

  // getToken(){
  //   if (localStorage.getItem('token')){
  //     return localStorage.getItem('token')
  //   }
  // }



















}
