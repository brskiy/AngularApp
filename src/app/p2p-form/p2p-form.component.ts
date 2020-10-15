import {Component, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import {ITransferInfo} from "../app.component";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-p2p-form',
  templateUrl: './p2p-form.component.html',
  styleUrls: ['./p2p-form.component.scss']
})

export class P2pFormComponent implements OnInit {

  loader:boolean = false;
  senderCardNumber:string = "";
  recipientCardNumber:string = "";
  fullName:string = "";
  sum: number;
  expiryMonth: string;
  expiryYear: string;
  months: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  years: string[] = ["20","21","22","23","24","25","26"];
  history: ITransferInfo[] = this._storageService.getHistory();
  isEmpty:boolean;
  emptyField:string;

  constructor(private _storageService:StorageService, private _notifierService: NotifierService) { }

  ngOnInit(): void {
    this.getHistory();
    this.repeat()
  }

  //Проверка на заполненность ВСЕХ полей
  isEmptyFields(): void{
   this.isEmpty = (!!this.senderCardNumber&&!!this.recipientCardNumber&&!!this.expiryMonth&&!!this.expiryYear&&!!this.sum&&!!this.fullName);
  }

  //Поиск названия пустого поля. TODO переделать на switch
  searchEmptyField(): void{
    this.emptyField = !this.senderCardNumber? "Номер карты плательщика": !this.recipientCardNumber? "Номер карты получателя": !(this.expiryMonth && this.expiryYear)? "Срок действия карты": !this.sum? "Сумма":!this.fullName? "ФИО": ""
  }
  //И без слов понятно
  addTransaction():void{
    this.loader = true;
    this.isEmptyFields();
    //Если поля заполнены
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
        }
    );
      //Обнуление
    this.senderCardNumber = null;
    this.recipientCardNumber = null;
    this.fullName = null;
    this.sum = null;
    this.expiryYear = null;
    this.expiryMonth = null;
      //Лоадер + уведомление
    setTimeout(() => {
      this._notifierService.notify("success","Платеж в обработке. Ожидайте начисления");
      this.loader = false
    },3000)
    }
    else {
      this.loader = false;
      this.searchEmptyField();
      this._notifierService.hideOldest();
      this._notifierService.notify("error",`Поле "${this.emptyField}" пустое. Заполни его, пожалуйста` )
    }

  }

  //Получение истории
  getHistory(): void{
    this.history = this._storageService.getHistory()
  }

  //Повтор операции
  repeat(): void{
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
