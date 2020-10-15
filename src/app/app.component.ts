import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from './http.service';

export interface TabsLinks {
  label: string;
  link: string;
  color?: string;
}
export interface TransferInfo {
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

  constructor(private _router: Router, private http: HttpService) {  }

  ngOnInit(): void {
    this.shouldOpen = localStorage.getItem('isOpen') === 'true';
    if (this.shouldOpen) {this._router.navigateByUrl('/p2p'); }
  }

  auth(){
    //this.http.auth("/api/user/auth", {name:this.login, password:this.password})
  }

  openChildComponent() : void {
    this.shouldOpen = true;
    localStorage.setItem('isOpen', 'true');
  }


}
