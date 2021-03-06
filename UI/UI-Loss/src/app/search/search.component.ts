import { Component, OnInit, Input } from '@angular/core';
import { Signs, Found, Find, Person, Category, Color, DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  selectedCategory: string;
  maxDate: Date = new Date();
  currentDate: Date = new Date();
  selectedColor: string;
  signs: Signs;
  result: string;
  message: string = "";
  isValidate: boolean = true;
  @Input()
  search_hid: boolean = true;
  tableHidden: boolean = true;
  buttonHidden: boolean = false;
  found: Found;
  date: Date = new Date();
  find: Find = new Find();
  person: Person = new Person();
  _Founds: Array<Found> = new Array<Found>();
  _Category: Array<Category> = new Array<Category>();
  _Colors: Array<Color> = new Array<Color>();
  _Status: string[] = ["נמצא", "מבוקש"];
  constructor(private _data: DataService) { }

  ngOnInit() {
    console.log(this.currentDate);
    this.signs = new Signs();
    this.signs.Description = "";
    this.signs.Remarks = "";
    this.selectedCategory = "";
    this.selectedColor = null;
    this._data.GetAllCategory().then(res => {
      if (res)
        this._Category = res;
    })

    this._data.GetColors().then(res => {
      if (res)
        this._Colors = res;
      console.log(this._Colors.length);
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
    let i;
    for (i = 1; i < this._Colors.length && this.selectedColor != this._Colors[i].color; i++);
    this.signs.Color = this._Colors[i].ColorCode;
    this.isValidate = false;
    console.log(this.isValidate)
  }

  onChange_Category($event) {
    let i;
    for (i = 1; i < this._Category.length && this.selectedCategory != this._Category[i].CategoryDesc; i++);
    this.signs.Category = this._Category[i].CategoryCode;
    console.log(this.selectedCategory);
  }

  onChange_Date($event) {
    this.signs.date = this.currentDate;
    this.isValidate = false;
  }

  SearchLoss() {
    console.log(this.signs.Description + " " + this.signs.Remarks);
    this._data.GetFounds(this.signs).then(res => {
      if (res) {
        this._Founds = res;
        this.tableHidden = false;
        for (let i = 0; i < this._Founds.length; i++) {
          this._Founds[i].Category = this._Category[this._Founds[i].CategoryCode - 1].CategoryDesc;
          this._Founds[i].color = this._Colors[this._Founds[i].FoundColor - 1].color;
          this._Founds[i].Status = this._Status[this._Founds[i].StatusCode - 2];
          console.log(this._Founds[i].Category + " " + this._Founds[i].color);
          // document.getElementById('id02').style.display = 'block';
        }
      }
    });
  }

  SelectFound(f: Found) {
    console.log(f.FoundCode);
    this.person.PersonID = f.FindID;
    f.StatusCode = 3;
    this._data.GetFind(this.person).then(res => {
      if (res) {
        this.find = res;
      }
    })
    this._data.ChangeFoundStatus(f).then(res => {
      this.result = res;
    });
    this.buttonHidden = true;  
  }

  Select() {
    this.message = "פרטי מוצא האבדה: " + " שם: " + this.find.FindName + " טלפון: " + this.find.FindPhone + " אימייל: " + this.find.FindEmail;
  }
}
