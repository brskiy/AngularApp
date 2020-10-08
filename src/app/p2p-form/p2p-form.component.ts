import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StorageService} from "../storage.service";
import {TransferInfo} from "../app.component";
import { NotifierService } from "angular-notifier";


@Component({
  selector: 'app-p2p-form',
  templateUrl: './p2p-form.component.html',
  styleUrls: ['./p2p-form.component.scss']
})
export class P2pFormComponent implements OnInit {

  constructor(private _storageService:StorageService, private _notifierService: NotifierService) { }

  ngOnInit(): void {
    this.getHistory();
    this.repeat()
  }

  loader:boolean = false

  senderCardNumber:string = "";
  recipientCardNumber:string = "";
  fullName:string = "";
  sum: number;
  expiryMonth: string;
  expiryYear: string;
  months: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  years: string[] = ["20","21","22","23","24","25","26"];
  history: TransferInfo[] = this._storageService.getHistory();

  isEmpty:boolean

  emptyField:string
  isEmptyFields(){
   this.isEmpty = (!!this.senderCardNumber&&!!this.recipientCardNumber&&!!this.expiryMonth&&!!this.expiryYear&&!!this.sum&&!!this.fullName);
  }
  searchEmptyField(){
    this.emptyField = !this.senderCardNumber? "Номер карты плательщика": !this.recipientCardNumber? "Номер карты получателя": !(this.expiryMonth && this.expiryYear)? "Срок действия карты": !this.sum? "Сумма":!this.fullName? "ФИО": ""
  }

  addTransaction(){
    this.loader = true
    this.isEmptyFields()
    if(this.isEmpty){
    this._storageService.addTransaction(
    {
      expiryMonth: Number(this.expiryMonth),
      expiryYear: Number(this.expiryYear),
      senderCardNumber: this.senderCardNumber,
      recipientCardNumber:this.recipientCardNumber,
      fullName:this.fullName,
      docDate: new Date(),
      sum: this.sum,
      id: this.history.length?this.history[0].id+1:0
    });

    this.senderCardNumber = null;
    this.recipientCardNumber = null;
    this.fullName = null;
    this.sum = null;
    this.expiryYear = null;
    this.expiryMonth = null
    setTimeout(() => {
      this._notifierService.notify("success","Платеж в обработке. Ожидайте начисления")
      this.loader = false
    },3000)


    }
    else {
      this.loader = false
      this.searchEmptyField()
      this._notifierService.notify("error",`Поле "${this.emptyField}" пустое. Заполни его, пожалуйста` )
    }

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
      this.sum = repeatTransaction.sum;
      this.expiryYear = String(repeatTransaction.expiryYear);
      this.expiryMonth = String(repeatTransaction.expiryMonth)
    }
    this._storageService.r=false;
    this._storageService.activeTransaction = null;
  }


}
