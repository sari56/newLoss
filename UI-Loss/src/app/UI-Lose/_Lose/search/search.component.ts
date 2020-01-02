import { Component, OnInit, Input } from '@angular/core';
import { WebApiService, Found, Category, Signs } from '../../Service/web-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  selectedValue: string;
  currentDate: Date = new Date();
  selectedColor: string;
  signs: Signs;
  @Input()
  search_hid: boolean = true;
  ListFound: Array<Found> = new Array<Found>();
  ListCategory: Array<Category> = new Array<Category>();
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    this.selectedValue = null;
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
  }

  onChange($event) {
    this.signs.Category = this.ListCategory[this.signs.Category].CategoryCode;
    console.log(this.selectedValue);
    this.signs.date = this.currentDate;
    console.log(this.currentDate);
    this.signs.Color = this.selectedColor;
    console.log(this.selectedColor);
  }


  SearchLoss() {
    this._WebApiService.GetFounds(this.signs).then(res => {
      if (res)
        this.ListFound = res;
    })
  }

  SelectFound(FoundID: string) {
    this._WebApiService.ChangeStatus(FoundID);
  }
}