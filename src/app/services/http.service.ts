import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';
import {Observable} from 'rxjs';
import {IResponse} from '../interfaces/IResponse';

@Injectable()

export class HttpService {

  constructor(private _http: HttpClient, private _notifierService: NotifierService) {}

  public get(url: string): Observable<IResponse<any>> {

    return this._http.get<IResponse<any>>(url, {headers: {"Content-Type": " application/json", "Authorization": "Bearer " + this.getToken()}})
  }

  public delete(url: string): Observable<any>{

    return this._http.delete<IResponse<any>>(url,{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+this.getToken()}})
  }


  public post(url: string, data: {}):Observable<IResponse<any>> {

    return this.getToken() ?
      this._http.post<IResponse<any>>(url,JSON.stringify(data),{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+this.getToken()}}):
      this._http.post<IResponse<any>>(url,JSON.stringify(data),{headers:{"Content-Type":" application/json"}})
  }

  private getToken(): string{
    return sessionStorage.getItem('token') || ""
  }
}
