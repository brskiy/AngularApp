import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import { HistoryComponent } from './history/history.component';
import { P2pFormComponent } from './p2p-form/p2p-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    P2pFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
