import {Injectable} from '@angular/core';
import {ITransferInfo} from '../interfaces/ITransferInfo';
import {HttpService} from './http.service';
import {NotifierService} from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})


export class StorageService {
  public isRepeat:boolean = false;
  public activeTransaction: ITransferInfo = null;
  public loading: boolean = false;
  public history: ITransferInfo[] = []
  constructor(private _http: HttpService, private _notifierService: NotifierService) { }



  getHistory():void{
    this.loading = true;
    this._http.get("api/p2p/transfer/history").subscribe(
      (result)=>{
        this.history = result.data;
        this.loading = false
      },
      (error)=>{
        this._notifierService.notify("error", error.error.error);
        this.loading = false
      },()=>{
        this.loading = false
      }
    )
  }

  addTransaction(transfer:ITransferInfo): void{
    this.loading = true;
    this._http.post("api/p2p/transfer/create", transfer).subscribe(
      (result)=>{
        this.loading = false;
        this._notifierService.notify("success","Перевод находится в обработке");
      },
      (error)=>{
        this._notifierService.notify("error", error.error.error);
        this.loading = false
      },()=>{
        this.loading = false
      }
    )

  }

  deleteTransaction(transfer:ITransferInfo): void{
    this.loading = true;
    this._http.delete(`api/p2p/transfer/delete/${transfer.id}`).subscribe(
      ()=>{
        this.getHistory();
        this._notifierService.notify("success","Удалено");
        this.loading = false
      },
      (error)=>{
        this._notifierService.notify("error", error.error.error);
        this.loading = false
      },()=>{
        this.loading = false
      }
    );
    this.history = this.history.filter((item) => item.id !== transfer.id) // Мгновенное изменение
  }

  repeat(transfer:ITransferInfo): void{
    this.activeTransaction = transfer;
    this.isRepeat = true
  }

}
