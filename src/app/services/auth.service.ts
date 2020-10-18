import { Injectable } from '@angular/core';
import {HttpService, IResponse} from './http.service';
import {NotifierService} from 'angular-notifier';
import {Md5} from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean = false;
  public loading: boolean;
  constructor(private _httpService: HttpService, private _notifierService: NotifierService) { }


  public isValidToken(): boolean {


    if (!sessionStorage.getItem("token")){
      return false
    }

    this.loading = true;
    this._httpService.get("/api/user/account").subscribe(
      (result:IResponse)=> {
        if(result.success){
          this.loading = false;
          this.isAuth = true

          return true
        }},
        (error) => {
          if(!sessionStorage.getItem("token")){
            this._notifierService.notify('error', "Время сессии истекло, авторизуйтесь");
          }else if (!this.isAuth){
            this._notifierService.notify('error', "Пожалуйста, авторизуйтесь");
          }
          this.loading = false;

          return false
          }, () => {
          this.loading = false
          }
    )
  }



  public auth(login: string, password:string) : void{
    this.loading = true;
    this._httpService.post("/api/user/auth",{name:login, password: this.hashPassword(password)}).subscribe(
      (result: IResponse) => {
        if(result.success){
          this.loading = false;
          this.isAuth = true
          this._notifierService.notify("success", "Авторизация успешно пройдена")
          sessionStorage.setItem("token",result.data.access_token)
        }
      },
      (error)=>{
        this.loading = false;
        this._notifierService.notify("error", error.error.error)
      }
    )
  }

  public toRegister(login: string, password:string): void{
    this.loading = true
    this._httpService.post("/api/user/createUser",{name:login, password: this.hashPassword(password)}).subscribe(
      (result: IResponse) => {
        if(result.success){
          this.loading = false;
          this._notifierService.notify("success", result.data)
          this._notifierService.notify("success", "Авторизуйтесь с данными, с которыми Вы только что зарегистрировались")
        }
      },
      (error)=>{
        this.loading = false;
        this._notifierService.notify("error", error.error.error)
      }
    )


  }


  private hashPassword(password: string): string{
    return Md5.hashStr(password+password).toString()
  }



}
