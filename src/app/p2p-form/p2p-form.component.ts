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
    this.repeat()
  }
  senderCardNumber:string = "";
  recipientCardNumber:string = "";
  fullName:string = "";
  sum: number;
  expiryMonth: number;
  expiryYear: number;
  months: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  years: string[] = ["20","21","22","23","24","25","26"];
  history: TransferInfo[] = this._storageService.getHistory();

  addTransaction(){

    this._storageService.addTransaction(
    {
      expiryMonth: Number(this.expiryMonth),
      expiryYear: Number(this.expiryYear),
      senderCardNumber: this.senderCardNumber,
      recipientCardNumber:this.recipientCardNumber,
      fullName:this.fullName,
      docDate: new Date(),
      sum: this.sum,
      id: this.history.length?this.history[this.history.length - 1].id+1:0
    })
  }

  getHistory(){
    console.log(this.history);
    this.history = this._storageService.getHistory()
  }

  repeat(){
    const repeatTransaction = this._storageService.activeTransaction;
    if(this._storageService.r){
      this.senderCardNumber = repeatTransaction.senderCardNumber;
      this.recipientCardNumber = repeatTransaction.recipientCardNumber;
      this.fullName = repeatTransaction.fullName;
      this.sum = repeatTransaction.sum
      this.expiryYear = repeatTransaction.expiryYear
      this.expiryMonth = repeatTransaction.expiryMonth
    }
    this._storageService.r=false;
    this._storageService.activeTransaction = null;

  }





}
