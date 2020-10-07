import { Component, OnInit } from '@angular/core';
import {StorageService} from "../storage.service";
import {TransferInfo} from "../app.component";



@Component({
  selector: 'app-p2p-form',
  templateUrl: './p2p-form.component.html',
  styleUrls: ['./p2p-form.component.scss']
})
export class P2pFormComponent implements OnInit {

  constructor(private _storageService:StorageService) { }

  ngOnInit(): void {
    this.getHistory()
  }
  senderCardNumber:string = ""
  month: string = ""
  year: string = ""
  months: string[] = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  years: string[] = ["20","21","22","23","24","25","26"];
  history: TransferInfo[] = []

  addTransaction(){

    this._storageService.addTransaction(
    {
      expiryMonth: this.month,
      expiryYear: this.year,
      senderCardNumber: this.senderCardNumber
    })
  }

  getHistory(){
    this.history = this._storageService.getHistory()
    console.log(this.history)
  }






}
