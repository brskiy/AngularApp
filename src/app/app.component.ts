import { Component} from '@angular/core';

export interface TabsLinks {
  label: string,
  link: string,
  color?:string
}
export interface TransferInfo {
  expiryMonth?:string,
  expiryYear?:string,
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



export class AppComponent{



}
