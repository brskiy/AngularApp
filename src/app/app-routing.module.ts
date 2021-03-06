import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {P2pFormComponent} from "./p2p-form/p2p-form.component";
import {HistoryComponent} from "./history/history.component";
import {AppComponent} from "./app.component";


const routes: Routes = [{path: '', redirectTo: "/login", pathMatch:'full'},
  { path: 'login', component:AppComponent},
  { path: 'history', component: HistoryComponent },
  { path: 'p2p', component: P2pFormComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
