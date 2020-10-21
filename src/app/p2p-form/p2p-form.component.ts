import {Component, DoCheck, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import {ITransferInfo} from '../interfaces/ITransferInfo';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-p2p-form',
  templateUrl: './p2p-form.component.html',
  styleUrls: ['./p2p-form.component.scss']
})

export class P2pFormComponent implements OnInit, DoCheck {

  form: FormGroup;
  loading:boolean = false;
  senderCardNumber:string = null;
  recipientCardNumber:string = null;
  fullName:string = null;
  sum: number = null;
  expiryMonth: string = null;
  expiryYear: string = null;
  months: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  years: string[] = ["20","21","22","23","24","25","26"];
  history: ITransferInfo[];


  constructor(
    private _storageService:StorageService,
  ) { }

  ngOnInit(): void {
    this.repeat();
    this.form = new FormGroup({
      senderCardNumber: new FormControl(null, [Validators.minLength(16), Validators.required]),
      fullName: new FormControl(null,[Validators.required, Validators.pattern(new RegExp(/^[A-Z, ]+$/))]),
      recipientCardNumber: new FormControl(null, [Validators.minLength(16), Validators.required]),
      sum: new FormControl(null, [Validators.required]),
      expiryMonth: new FormControl(null, [Validators.required]),
      expiryYear: new FormControl(null, [Validators.required])
    })
  }

   ngDoCheck(): void { // переделать
    this.loading = this._storageService.loading;
   }


  public addTransaction():void{
    this._storageService.addTransaction(
        {
        expiryMonth: Number(this.expiryMonth),
        expiryYear: Number(this.expiryYear),
        senderCardNumber: this.senderCardNumber,
        recipientCardNumber: this.recipientCardNumber,
        fullName: this.fullName,
        sum: Number(this.sum)
        }
    );
      this.form.reset();
  }


  public repeat(): void{
    if(this._storageService.isRepeat){
      const repeatTransaction = this._storageService.activeTransaction;

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


  public submit(): void{
    this.addTransaction()
  }

}
