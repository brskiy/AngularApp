import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { HistoryComponent } from './history/history.component';
import { P2pFormComponent } from './p2p-form/p2p-form.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import {StorageService} from './services/storage.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { NotifierModule } from 'angular-notifier';
import { CardViewTransformPipe } from './pipes/card-view-transform.pipe';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {AuthService} from './services/auth.service';
import {HttpService} from './services/http.service';


registerLocaleData(localeRu, 'ru');
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    P2pFormComponent,
    LayoutComponent,
    CardViewTransformPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    NgxMaskModule.forRoot(),
    NotifierModule,
    HttpClientModule,
    MatSortModule
  ],
  providers: [
    StorageService,
    AuthService,
    HttpService,
    {provide: LOCALE_ID, useValue: 'ru'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
