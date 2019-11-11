import { Component, OnInit, Input } from '@angular/core';
import { WebApiService, Category, Found } from '../../Service/web-api.service';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})

export class FoundComponent implements OnInit {
  selectedColor: string;
  @Input()
  found_hid: boolean = true;
  isHidden: boolean = true;
  found: Found;
  userName: string;
  email: string;
  selectedCategory: string;
  today: Date = new Date();
  currentDate: Date = new Date();
  constructor(private _WebApiService: WebApiService) { }
  ListCategory: Array<Category> = new Array<Category>();
  ngOnInit() {
    // console.log(this.today);
    this.found = new Found();
    this.selectedColor = null;
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
    console.log(this.ListCategory.length);
  }

  onChange_Color($event) {
    console.log(this.selectedColor);
    this.found.FoundColor = this.selectedColor;
  }

  onChange_Category($event) {
    let i;
    for (i = 1; i < this.ListCategory.length && this.selectedCategory != this.ListCategory[i].CategoryDesc; i++);
    this.found.CategoryCode = this.ListCategory[i].CategoryCode;
    console.log(this.selectedCategory)
    console.log(this.selectedCategory + "  " + this.found.CategoryCode.toString())
  }

  onChange_Date($event) {
    this.found.FoundDate = this.currentDate;
    console.log(this.currentDate);
  }

  Check(fid, pass) {
    //  if(this._WebApiService.CheckMatch_FindCode(fid,pass)==true)
    this.isHidden = false;
    console.log("Check");
    console.log(this.isHidden);
  }

  SaveFound(f: Found) {
    if (this.currentDate > this.today){
       window.alert("תאריך לא חוקי");
    }
     else{
      //  this.found.StatusCode = 2;
      //  this.found.Date = this.today;
      f.Date = this.today;
      f.StatusCode = 2;
      f.CategoryCode = this.found.CategoryCode;
       this._WebApiService.InsertFound(f);
     }
  }
}
