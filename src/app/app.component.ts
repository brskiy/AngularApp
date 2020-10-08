import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

export interface TabsLinks {
  label: string,
  link: string,
  color?:string
}
export interface TransferInfo {
  expiryMonth?:number,
  expiryYear?:number,
  senderCardNumber?:string,
  recipientCardNumber?:string,
  fullName?:string,
  docDate?: Date,
  sum?: number,
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{

  constructor(private _router: Router) {  }

  public should_open:boolean = false
  ngOnInit(): void {
    this.should_open = localStorage.getItem("isOpen")==='true'
    if (this.should_open) {this._router.navigateByUrl("/p2p")}
  }

  openChildComponent(){
    this.should_open = true;
    localStorage.setItem("isOpen", 'true')
  }


}
