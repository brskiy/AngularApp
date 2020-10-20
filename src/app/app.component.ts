import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {NotifierService} from 'angular-notifier';

 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit, DoCheck{

  public shouldOpen: boolean = this._authService.isAuth;
  public login:string;
  public password: string;
  public loading: boolean = false;

  constructor(private _router: Router, private _authService: AuthService, private _notifierService: NotifierService) {  }

  ngOnInit(): void {
    this._authService.isValidToken();
    this.shouldOpen = this._authService.isAuth;
    if (this.shouldOpen) {
      this._router.navigateByUrl('/p2p')}
  }

  ngDoCheck(): void{
    this.shouldOpen = this._authService.isAuth;
    this.loading = this._authService.loading
  }

  tokenAuth(login:string, password: string):void{
    this._authService.auth(this.login,this.password)
  }

  toRegister(login:string, password: string):void{
    this._authService.toRegister(this.login, this.password);
    this.login = this.password = ""
  }

   public logout():void{
     sessionStorage.removeItem('token');
     this._authService.isAuth = false;
     this._notifierService.notify("success","Вы успешно вышли из аккаунта");
     this._router.navigateByUrl("/login")
   }


 }
