import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {options} from '../app.module';
import {combineAll} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';

export interface IResponse {
  data: any;
  success: boolean;
  error:string;
}

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private response:any
  private success: boolean

  constructor(private http: HttpClient, private _notifierService: NotifierService) {}

  get(url:string, token:string):IResponse{

      this.http.get(url,{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+token}})
        .subscribe(response => this.response = response, error => this._notifierService.notify('error', error))

      return this.response
  }

  delete(url: string, token:string): boolean{

    this.http.delete(url,{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+token}})
      .subscribe(() => this.success = true, error => this._notifierService.notify('error', error))

    console.log(this.success)

    return this.success
  }


  post(url: string, data: {}, token?:string):IResponse {
    if(token){
      this.http.post(url,JSON.stringify(data),{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+token}})
        .subscribe(response => this.response = response, error => this._notifierService.notify('error', error.error.error))
    } else {
      this.http.post(url,JSON.stringify(data),{headers:{"Content-Type":" application/json"}})
        .subscribe(response => this.response = response, error => this._notifierService.notify('error', error.error.error))
    }
  console.log(this.response)

    return this.response
  }
}
