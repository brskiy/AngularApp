import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {NotifierService} from 'angular-notifier';
import {Md5} from 'ts-md5/dist/md5';
import {IResponse} from '../interfaces/IResponse';
import {IToken} from '../interfaces/IToken';

@Injectable()

export class AuthService {
  public isAuth: boolean = false;
  public loading: boolean;
  constructor(private _httpService: HttpService, private _notifierService: NotifierService) { }


  public isValidToken(): void {

    if (!sessionStorage.getItem("token")){
      return
    }

    this.loading = true;
    this._httpService.get("/api/user/account").subscribe(
      (result:IResponse<string>)=> {
        if(result.success){
          this.loading = false;
          this.isAuth = true
        }},
        (error) => {
          sessionStorage.removeItem('token');
          this._notifierService.notify('error', "Время сессии истекло, авторизуйтесь");
          this.loading = false;
          },
      () => {
          this.loading = false
          }
    )
  }



  public auth(login: string, password:string) : void{
    this.loading = true;
    this._httpService.post("/api/user/auth",{name:login, password: this.hashPassword(password)}).subscribe(
      (result: IResponse<IToken>) => {
        if(result.success){
          this.loading = false;
          this.isAuth = true;
          this._notifierService.notify("success", "Авторизация успешно пройдена");
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
    this.loading = true;
    this._httpService.post("/api/user/createUser",{name:login, password: this.hashPassword(password)}).subscribe(
      (result: IResponse<string>) => {
        if(result.success){
          this.loading = false;
          this._notifierService.notify("success", result.data);
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
