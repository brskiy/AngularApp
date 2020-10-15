import { Injectable } from '@angular/core';
import {ITransferInfo} from "../app.component";

@Injectable({
  providedIn: 'root'
})


export class StorageService {
  h: ITransferInfo[] = []
  activeTransaction: ITransferInfo = null
  r:boolean = false

  constructor() { }

  getHistory():ITransferInfo[]{
    return this.h
  }

  addTransaction(transfer:ITransferInfo): void{
    this.h.unshift(transfer)
  }

  deleteTransaction(transfer:ITransferInfo): void{
    this.h = this.h.filter((item) => item.id !== transfer.id)
  }

  repeat(transfer:ITransferInfo): void{
    this.activeTransaction = transfer
    this.r = true
  }

}
