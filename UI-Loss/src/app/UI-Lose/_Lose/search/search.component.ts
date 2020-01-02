import { Component, OnInit, Input } from '@angular/core';
import { WebApiService, Found, Category, Signs } from '../../Service/web-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  selectedCategory: string;
  currentDate: Date = new Date();
  selectedColor: string;
  signs: Signs;
  @Input()
  search_hid: boolean = true;
  ListFound: Array<Found> = new Array<Found>();
  ListCategory: Array<Category> = new Array<Category>();
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    this.signs = new Signs();
    this.currentDate = new Date();
    this.selectedCategory = "";
    this.selectedColor = null;
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
  }

  // onChange($event) {
  //   this.signs.Category = this.ListCategory[this.signs.Category].CategoryCode;
  //   console.log(this.selectedValue);
  //   this.signs.date = this.currentDate;
  //   console.log(this.currentDate);
  //   this.signs.Color = this.selectedColor;
  //   console.log(this.selectedColor);
  // }

  onChange_Color($event) {
    console.log(this.selectedColor);
    this.signs.Color = this.selectedColor;
  }

  onChange_Category($event) {
    let i;
    for (i = 1; i < this.ListCategory.length && this.selectedCategory != this.ListCategory[i].CategoryDesc; i++);
    this.signs.Category = this.ListCategory[i].CategoryCode;
    console.log(this.selectedCategory)
    // console.log(this.selectedCategory + "  " + this.signs.Category.toString())
  }

  onChange_Date($event) {
    this.signs.date = this.currentDate;
    console.log(this.currentDate);
  }

  SearchLoss(selectedCategory: string, currentDate: Date, selectedColor: string) {
    //this.signs.Category = this.ListCategory[this.signs.Category].CategoryCode;
    this.signs.date = this.currentDate;
    this.signs.Color = this.selectedColor;
    this._WebApiService.GetFounds(this.signs).then(res => {
      if (res)
        this.ListFound = res;
    })
  }

  SelectFound(FoundID: string) {
    this._WebApiService.ChangeStatus(FoundID);
  }
}