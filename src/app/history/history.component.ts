import { Component, OnInit } from '@angular/core';
import {StorageService} from "../storage.service";
import {TransferInfo} from "../app.component";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private _storageService:StorageService) { }

  ngOnInit(): void {
    this.getHistory()
  }
  history: TransferInfo[] = []

  getHistory(){
    this.history = this._storageService.getHistory()
  }

}
