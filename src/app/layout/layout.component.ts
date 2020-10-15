import {Component, DoCheck} from '@angular/core';
import {ITabsLinks} from "../app.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements DoCheck {

  public links:ITabsLinks[] = [
    {label:"Перевод",link:"/p2p"},
    {label:"История",link:"/history"},];

  public activeLink: string;

  constructor() {  }


  ngDoCheck():void{
    this.activeLink = location.pathname
  }





}
