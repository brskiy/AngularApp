import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuth(){
    if (localStorage.getItem('token')){


      return localStorage.getItem('token')
    }
  }



















}
