import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular';
  onOrOff = false;

  clickOnButton (){
    this.onOrOff = !this.onOrOff
  }
}
