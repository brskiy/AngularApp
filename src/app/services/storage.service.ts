import {Injectable} from '@angular/core';
import {ITransferInfo} from '../interfaces/ITransferInfo';
import {HttpService} from './http.service';
import {NotifierService} from 'angular-notifier';
import {Observable, Subject} from 'rxjs';
import {IResponse} from '../interfaces/IResponse';

@Injectable()

export class StorageService {
  public isRepeat:boolean = false;
  public activeTransaction: ITransferInfo = null;
  public history: ITransferInfo[] = [];
  private subject: Subject<any> = new Subject<any>()

  constructor(
    private _http: HttpService,
    private _notifierService: NotifierService) {
  }



  getHistory():void{
    this.subject.next(true)
    this._http.get("api/p2p/transfer/history").subscribe(
      (result:IResponse<ITransferInfo[]>)=>{
        this.history = result.data;
        this.subject.next(false)
      },
      (error)=>{
        this._notifierService.notify("error", error.error.error);
        this.subject.next(false)
      }
    )
  }

  addTransaction(transfer:ITransferInfo): void{
    this.subject.next(true)
    this._http.post("api/p2p/transfer/create", transfer).subscribe(
      (result:IResponse<string>)=>{
        this.subject.next(false)
        this._notifierService.notify("success","Перевод находится в обработке");
        this.getHistory()

      },
      (error)=>{
        this._notifierService.notify("error", error.error.error);
        this.subject.next(false)
      }
    )

  }

  deleteTransaction(transfer:ITransferInfo): void{
    this.subject.next(true)
    this._http.delete(`api/p2p/transfer/delete/${transfer.id}`).subscribe(
      (result:IResponse<string>)=>{
        this._notifierService.notify("success","Удалено");
        this.subject.next(false)
        this.getHistory()
      },
      (error)=>{
        this._notifierService.notify("error", error.error.error);
        this.subject.next(false)
      }
    );
    this.history = this.history.filter((item) => item.id !== transfer.id) // Мгновенное изменение
  }

  repeat(transfer:ITransferInfo): void{
    this.activeTransaction = transfer;
    this.isRepeat = true
  }







  getLoading(): Observable<any>{
    return this.subject.asObservable()
  }
}
