import {Component, DoCheck} from '@angular/core';
import {ITabsLinks} from '../interfaces/ITabsLinks';
import {Router} from '@angular/router';

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

  constructor(private _router : Router) {  }


  ngDoCheck():void{ // переделать
    this.activeLink = location.pathname
  }




}
