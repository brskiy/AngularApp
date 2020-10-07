import { Injectable } from '@angular/core';
import {TransferInfo} from "./app.component";

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }
  h: TransferInfo[] = []

  getHistory(){
    return this.h
  }

  addTransaction(transfer:TransferInfo){
    this.h.push(transfer)
  }

  deleteTransaction(transfer:TransferInfo){
    this.h = this.h.filter((h) => {return h.id == transfer.id})
  }

}
