import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';
import {Observable} from 'rxjs';

export interface IResponse {
  data: any;
  success: boolean;
  error:string;
}

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private _http: HttpClient, private _notifierService: NotifierService) {}

  public get(url: string): Observable<IResponse> {

    return this._http.get<IResponse>(url, {headers: {"Content-Type": " application/json", "Authorization": "Bearer " + this.getToken()}})
  }

  public delete(url: string): Observable<boolean>{

    return this._http.delete<boolean>(url,{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+this.getToken()}})
  }


  public post(url: string, data: {}):Observable<IResponse> {

    return this.getToken() ?
      this._http.post<IResponse>(url,JSON.stringify(data),{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+this.getToken()}}):
      this._http.post<IResponse>(url,JSON.stringify(data),{headers:{"Content-Type":" application/json"}})
  }

  private getToken(): string{
    return sessionStorage.getItem('token') || ""
  }
}
