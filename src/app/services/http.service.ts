import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {options} from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private response:any
  private success: boolean

  constructor(private http: HttpClient) {}

  get(url:string, token:string):{}{

      this.http.get(url,{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+token}})
        .subscribe(response => this.response = response)

      return this.response
  }

  delete(url: string, token:string): boolean{

    this.http.delete(url,{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+token}})
      .subscribe(() => this.success = true)

    console.log(this.success)

    return this.success
  }


  post(url: string, data: {}, token?:string):{} {
    if(token){
      this.http.post(url,JSON.stringify(data),{headers:{"Content-Type":" application/json", "Authorization":"Bearer "+token}})
        .subscribe(response => this.response = response)
    } else {
      this.http.post(url,JSON.stringify(data),{headers:{"Content-Type":" application/json"}})
        .subscribe(response => this.response = response)
    }

    return this.response
  }
}
