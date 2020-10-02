import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ThemePalette} from "@angular/material/core";

interface TabsLinks {
  label: string,
  link: string,
  color?:string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {

  links:TabsLinks[] = [
    {label:"Перевод",link:"/p2pForm", color: "red"},
    {label:"История",link:"/history"}];


  activeLink = this.links[0];
  background: ThemePalette = undefined;



}
