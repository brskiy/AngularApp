import {Component, DoCheck, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {ITransferInfo} from '../interfaces/ITransferInfo';
import set = Reflect.set;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, DoCheck {
  public loading: boolean = false;
  public history: ITransferInfo[] = this._storageService.history;
  public displayedColumns: string[] = ['id', 'senderCardNumber', 'recipientCardNumber', 'sum', 'docDate','actions'];


  constructor(private _storageService:StorageService, private _router: Router) {
  }

  ngOnInit(): void {
    this.getHistory()
    this.history = this._storageService.history
  }


  ngDoCheck(): void{
    this.loading = this._storageService.loading
  }

  getHistory():void{
    this._storageService.getHistory()
    this.history = this._storageService.history
  }


  deleteTransaction(element:ITransferInfo):void{
    this._storageService.deleteTransaction(element)
    this.history = this._storageService.history
  }


  redirectP2P():void{
    this._router.navigateByUrl("/p2p")
  }

  repeat(element:ITransferInfo):void{
    this._storageService.repeat(element)
    this.redirectP2P()
  }

}
