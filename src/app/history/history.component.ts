import {Component, DoCheck, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {ITransferInfo} from '../interfaces/ITransferInfo';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, DoCheck {
  public loader: boolean = false;
  public history: ITransferInfo[] = [];
  public displayedColumns: string[] = ['id', 'senderCardNumber', 'recipientCardNumber', 'sum', 'docDate','actions'];


  constructor(private _storageService:StorageService, private _router: Router) {
  }

  ngOnInit(): void {
    this.getHistory()
  }

  getHistory():void{
    this.history = this._storageService.getHistory()
  }

  deleteTransaction(element:ITransferInfo):void{
    this.loader = true
    this._storageService.deleteTransaction(element)
    setTimeout(()=>this.loader = false, 1000)
  }

  ngDoCheck():void{
    this.getHistory()
  }

  redirectP2P():void{
    this._router.navigateByUrl("/p2p")
  }

  repeat(element:ITransferInfo):void{
    this._storageService.repeat(element)
    this.redirectP2P()
  }

}
