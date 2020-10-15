import { Injectable } from '@angular/core';
import {HttpService, IResponse} from './http.service';
import {MD5} from 'crypto-js'
import {NotifierService} from 'angular-notifier';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean = false
  private response: IResponse
  constructor(private http: HttpService, private _notifierService: NotifierService) { }


  isValidToken():boolean{
   return this.http.get("/api/user/account", localStorage.getItem('Token')).success
  }

  getToken():string{
    if (this.isValidToken()){
      return localStorage.getItem('token')
      this.isAuth = true
    }
  }

  tokenAuth(login: string, password:string) : void{

    password = MD5(password+password).toString()
    this.response = this.http.post("/api/user/auth",{name:login, password: password},localStorage.getItem('Token'))

    //console.log(this.response)

    // if(!this.response.success){
    //   this._notifierService.notify("error",this.response.error )
    //   console.log('ff')
    // }


  }



















}
