import {Component, DoCheck, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import { NotifierService } from "angular-notifier";
import {ITransferInfo} from '../interfaces/ITransferInfo';

@Component({
  selector: 'app-p2p-form',
  templateUrl: './p2p-form.component.html',
  styleUrls: ['./p2p-form.component.scss']
})

export class P2pFormComponent implements OnInit, DoCheck {

  loading:boolean = false;
  senderCardNumber:string = "";
  recipientCardNumber:string = "";
  fullName:string = "";
  sum: number;
  expiryMonth: string;
  expiryYear: string;
  months: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  years: string[] = ["20","21","22","23","24","25","26"];
  history: ITransferInfo[];
  isNotEmpty:boolean;
  emptyField:string;

  constructor(private _storageService:StorageService, private _notifierService: NotifierService) { }

  ngOnInit(): void {
    this.repeat()
  }
   ngDoCheck(): void {
    this.loading = this._storageService.loading;


   }

  //И без слов понятно
  public addTransaction():void{
    this.loading = true;
    this.isEmptyFields();
    //Если поля заполнены
    if(this.isNotEmpty){
      this._storageService.addTransaction(
        {
        expiryMonth: Number(this.expiryMonth),
        expiryYear: Number(this.expiryYear),
        senderCardNumber: this.senderCardNumber,
        recipientCardNumber:this.recipientCardNumber,
        fullName:this.fullName,
        sum: this.sum
        }
    );

      //Обнуление
      this.senderCardNumber = null;
      this.recipientCardNumber = null;
      this.fullName = null;
      this.sum = null;
      this.expiryYear = null;
      this.expiryMonth = null;
      this.loading = false;

    }
    else {
      this.loading = false;
      this.searchEmptyField();
      this._notifierService.hideOldest();
      this._notifierService.notify("error",`Поле "${this.emptyField}" пустое. Заполни его, пожалуйста` )
    }
    this.getHistory()

  }

  //Повтор операции
  public repeat(): void{
    if(this._storageService.isRepeat){
      const repeatTransaction = this._storageService.activeTransaction;
      this.getHistory();
      this.senderCardNumber = repeatTransaction.senderCardNumber;
      this.recipientCardNumber = repeatTransaction.recipientCardNumber;
      this.fullName = repeatTransaction.fullName;
      this.sum = repeatTransaction.sum;
      this.expiryYear = String(repeatTransaction.expiryYear);
      this.expiryMonth = String(repeatTransaction.expiryMonth)
    }
    this._storageService.isRepeat=false;
    this._storageService.activeTransaction = null;
  }

  //Проверка на заполненность ВСЕХ полей
  private isEmptyFields(): void{
   this.isNotEmpty = (!!this.senderCardNumber&&!!this.recipientCardNumber&&!!this.expiryMonth&&!!this.expiryYear&&!!this.sum&&!!this.fullName);
  }

  //Поиск названия пустого поля
  private searchEmptyField(): void{
    this.emptyField =
      !this.senderCardNumber?
      "Номер карты плательщика":
        !this.recipientCardNumber?
          "Номер карты получателя":
           !(this.expiryMonth && this.expiryYear)?
             "Срок действия карты":
             !this.sum?
               "Сумма":
               !this.fullName?
                 "ФИО": ""
  }

  //Получение истории
  private getHistory(): void{
    this._storageService.getHistory()
    this.history = this._storageService.history
  }


}
