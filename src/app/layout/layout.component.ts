import { Component, OnInit } from '@angular/core';
import {TabsLinks} from "../app.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  links:TabsLinks[] = [
    {label:"Перевод",link:"/p2p"},
    {label:"История",link:"/history"},];
  constructor() {  }

  activeLink: string

  ngOnInit(){
    this.activeLink = location.pathname
  }





}
