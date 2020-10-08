import { Injectable } from '@angular/core';
import {TransferInfo} from "./app.component";

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }
  h: TransferInfo[] = []
  activeTransaction: TransferInfo = null
  r:boolean = false

  getHistory(){
    return this.h
  }

  addTransaction(transfer:TransferInfo){
    this.h.unshift(transfer)
  }

  deleteTransaction(transfer:TransferInfo){
    this.h = this.h.filter((item) => item.id !== transfer.id)
  }

  repeat(transfer:TransferInfo){
    this.activeTransaction = transfer
    this.r = true
  }

}
