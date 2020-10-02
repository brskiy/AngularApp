import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {P2pFormComponent} from "./p2p-form/p2p-form.component";
import {HistoryComponent} from "./history/history.component";


const routes: Routes = [{ path: '', redirectTo: '/first', pathMatch: 'full' },
  { path: 'history', component: HistoryComponent },
  { path: 'p2pForm', component: P2pFormComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
