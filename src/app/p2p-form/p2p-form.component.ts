import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-p2p-form',
  templateUrl: './p2p-form.component.html',
  styleUrls: ['./p2p-form.component.scss']
})
export class P2pFormComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  month: string[] = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  year: string[] = ["20","21","22","23","24","25","26"];
  selected = 'option2';

}
