import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from './services/http.service';
import {AuthService} from './services/auth.service';

export interface ITabsLinks {
  label: string;
  link: string;
  color?: string;
}
export interface ITransferInfo {
  expiryMonth: number;
  expiryYear: number;
  senderCardNumber: string;
  recipientCardNumber: string;
  fullName: string;
  docDate: Date;
  sum: number;
  id?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{

  public shouldOpen: boolean = false;
  public login:string
  public password: string

  constructor(private _router: Router, private http: HttpService, private auth: AuthService) {  }

  ngOnInit(): void {
    this.shouldOpen = localStorage.getItem('isOpen') === 'true';
    if (this.shouldOpen) {this._router.navigateByUrl('/p2p'); }
  }

  tokenAuth(login:string, password: string):void{
    this.auth.tokenAuth(this.login,this.password)
    //this.http.auth("/api/user/auth", {name:this.login, password:this.password})
  }

  openChildComponent() : void {
    this.shouldOpen = true;
    localStorage.setItem('isOpen', 'true');
  }


}
