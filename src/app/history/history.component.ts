import {Component, DoCheck, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {TransferInfo} from "../app.component";
import {MatTableModule} from '@angular/material/table';
import {Router} from "@angular/router";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, DoCheck {


  constructor(private _storageService:StorageService, private _router: Router) {
  }

  ngOnInit(): void {
    this.getHistory()
  }
  loader: boolean = false;
  history: TransferInfo[] = [];
  displayedColumns: string[] = ['id', 'senderCardNumber', 'recipientCardNumber', 'sum', 'docDate','actions'];

  getHistory(){
    this.history = this._storageService.getHistory()
  }

  deleteTransaction(element:TransferInfo){
    this.loader = true
    this._storageService.deleteTransaction(element)
    setTimeout(()=>this.loader = false, 1000)
  }

  ngDoCheck(){
    this.getHistory()
  }

  repeat(element:TransferInfo){
    this._storageService.repeat(element)
    this._router.navigateByUrl("/p2p")
  }
}
