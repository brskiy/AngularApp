import { Injectable } from '@angular/core';
import {ITransferInfo} from '../interfaces/ITransferInfo';

@Injectable({
  providedIn: 'root'
})


export class StorageService {
  public isRepeat:boolean = false
  public activeTransaction: ITransferInfo = null
  private history: ITransferInfo[] = []

  constructor() { }

  getHistory():ITransferInfo[]{
    return this.history
  }

  addTransaction(transfer:ITransferInfo): void{
    this.history.unshift(transfer)
  }

  deleteTransaction(transfer:ITransferInfo): void{
    this.history = this.history.filter((item) => item.id !== transfer.id)
  }

  repeat(transfer:ITransferInfo): void{
    this.activeTransaction = transfer
    this.isRepeat = true
  }

}
