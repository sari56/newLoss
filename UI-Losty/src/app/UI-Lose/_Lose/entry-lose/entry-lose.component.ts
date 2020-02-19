import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-lose',
  templateUrl: './entry-lose.component.html',
  styleUrls: ['./entry-lose.component.scss']
})
export class EntryLoseComponent implements OnInit {
  mapHidden: boolean = true;
  searchHidden: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  ChangeMap() {
    this.searchHidden = true;
    this.mapHidden = false;
  }

  ChangeSearch() {
    this.mapHidden = true;
    this.searchHidden = false;
  }

}
