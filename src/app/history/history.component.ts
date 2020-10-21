import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {ITransferInfo} from '../interfaces/ITransferInfo';
import {MatTableDataSource} from '@angular/material/table';
import {HttpService} from '../services/http.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {


  public loading: boolean = false;
  public history: ITransferInfo[]
  public displayedColumns: string[] = ['id', 'senderCardNumber', 'recipientCardNumber', 'sum', 'docDate','actions'];
  public dataSource: MatTableDataSource<any>
  private _subscription: Subscription;



  constructor(private _storageService:StorageService, private _router: Router, private _http: HttpService) {
    this._subscription = this._storageService.getLoading().subscribe(
      (loading: boolean) => {
        this.loading = loading
      }
    )
  }

  ngOnInit(): void {
    this.getHistoryThere()
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }



  getHistoryThere(): void{
    this.loading = true
    this._http.get("api/p2p/transfer/history").subscribe( // баг с пустой историей при перезагрузке
      (result)=>{
        this.history = result.data;
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.history);
      },
      (error)=>{
        this.loading = false
      },()=>{
        this.loading = false
      }
    )
  }

  deleteTransaction(element:ITransferInfo):void{
    this._storageService.deleteTransaction(element);
    this.getHistoryThere()

  }


  redirectP2P():void{
    this._router.navigateByUrl("/p2p")
  }

  repeat(element:ITransferInfo):void{
    this._storageService.repeat(element);
    this.redirectP2P()
  }

  applyFilter(event: KeyboardEvent):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Дыра в безопасности ( фильтрация по скрытому номеру карты? ) Исправится, если бэк будет присылатль шифрованное
  }
}
