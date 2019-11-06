import { Component, OnInit, Input } from '@angular/core';
import { WebApiService, Found } from '../../Service/web-api.service';
import { Category } from '../../Category';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input()
  search_hid: boolean = true;
  ListFound: Array<Found> = new Array<Found>();
  constructor(private _WebApiService: WebApiService) { }
  ListCategory: Array<Category> = new Array<Category>();
  ngOnInit() {
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
  }

  SearchLoss(category: number, color: string , date: Date ) {
    this._WebApiService.GetFounds([{Value: category},{Value: color},{Value: date}]).then(res => {
      if (res)
        this.ListFound = res;
    })
  }
}
