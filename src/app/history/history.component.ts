import {Component, DoCheck, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {ITransferInfo} from '../interfaces/ITransferInfo';

import {MatTableDataSource} from '@angular/material/table';
import {HttpService} from '../services/http.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, DoCheck {


  public loading: boolean = false;
  public history: ITransferInfo[]
  public displayedColumns: string[] = ['id', 'senderCardNumber', 'recipientCardNumber', 'sum', 'docDate','actions'];



  constructor(private _storageService:StorageService, private _router: Router, private _http: HttpService) {

  }

  ngOnInit(): void {
    this._http.get("api/p2p/transfer/history").subscribe( // баг с пустой историей при перезагрузке
      (result)=>{
        this.history = result.data;
        this.loading = false;
      },
      (error)=>{
        this.loading = false
      },()=>{
        this.loading = false
      }
    )
  }


  ngDoCheck(): void{
    this.loading = this._storageService.loading
  }

  deleteTransaction(element:ITransferInfo):void{
    this._storageService.deleteTransaction(element);
    this.history = this._storageService.history
  }


  redirectP2P():void{
    this._router.navigateByUrl("/p2p")
  }

  repeat(element:ITransferInfo):void{
    this._storageService.repeat(element);
    this.redirectP2P()
  }

}
