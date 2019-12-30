import { Component, OnInit, Input } from '@angular/core';
import { WebApiService, Found, Category } from '../../Service/web-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  selectedValue: string;
  currentDate: Date = new Date();
  selectedColor: string;
  info: Array<any>;
  @Input()
  search_hid: boolean = true;
  ListFound: Array<Found> = new Array<Found>();
  constructor(private _WebApiService: WebApiService) { }
  ListCategory: Array<Category> = new Array<Category>();
  ngOnInit() {
    this.selectedValue = null;
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
  }

  onChange($event) {
    console.log(this.selectedValue);
    console.log(this.currentDate);
    console.log(this.selectedColor);
  }


  SearchLoss(category: number, color: string, date: Date) {
    this._WebApiService.GetFounds([category, color, date]).then(res => {
      if (res)
        this.ListFound = res;
    })
  }

  SelectFound(FoundID: string) {
    this._WebApiService.ChangeStatus(FoundID);
  }
}