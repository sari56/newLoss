import { Component, OnInit, Input } from '@angular/core';
import { WebApiService, Category, Found, Color } from '../../Service/web-api.service';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})

export class FoundComponent implements OnInit {
  @Input()
  found_hid: boolean = true;
  isVerifyUser: boolean = false;
  isHidden: boolean = true;
  found: Found;
  userName: string;
  status: string = "מוצא";
  email: string;
  selectedCategory: string;
  selectedColor: string;
  today: Date;
  currentDate: Date = new Date();
  constructor(private _WebApiService: WebApiService) { }
  ListCategory: Array<Category> = new Array<Category>();
  Colors: Array<Color> = new Array<Color>();

  ngOnInit() {
    // console.log(this.today);
    this.today = new Date();
    this.found = new Found();
    this.selectedColor = null;
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
    console.log(this.ListCategory.length);

    this._WebApiService.GetColors().then(res => {
      if (res)
        this.Colors = res;
      console.log(this.Colors.length);
    })
  }

  onChange_Color($event) {
    console.log(this.selectedColor);
    let i;
    for (i = 1; i < this.Colors.length && this.selectedColor != this.Colors[i].color; i++);
    this.found.FoundColor = this.Colors[i].ColorCode;
    //this.found.FoundColor = this.selectedColor;
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

  Check(userName: string, email: string) {
    // console.log("Check   id" + id.toString() + "pass  " + userName.toString() + "email  " + email.toString());
    // if (this._WebApiService.VerifyUserName([{Value: status, Name: "status"}, {Value: id, Name: "id"}, {Value: userName, Name: "userName"}, {Value: email, Name: "email"}]) == true)

    this._WebApiService.VerifyUserName([this.status, userName, email]).then(res => {
      if (res == true) {
        this.isHidden = false;
      }
      else {
        window.alert("שם משתמש שגוי");
      }
      // this.isSave.emit(false); 
    });
    //this.isVerifyUser = this._WebApiService.VerifyUserName([this.status, id, userName, email]);
    // if(this.isVerifyUser == true) {
    // console.log("====" + this.isHidden);
    // this.isHidden = false;
    // }
    //     else {
    //   window.alert("שם משתמש שגוי");
    // }
    // console.log(this.isHidden);
  }

  SaveFound(f: Found, currentDate: Date) {
    console.log(this.currentDate);
    console.log(this.today);
    if (this.currentDate > this.today) {
      window.alert("תאריך לא חוקי");
    }
    else {
      f.FindID = this.userName;
      f.CategoryCode = this.found.CategoryCode;
      f.FoundColor = this.found.FoundColor;
      f.Found_X = 1;
      f.Found_Y = 1;
      f.StatusCode = 2;
      f.Date = this.today;
      this._WebApiService.InsertFound(f).then(res => {
        if (res == "Inserting Found Seccessfuly") {
          window.alert("המציאה התווספה בהצלחה!");
        }
        else {
          window.alert("שגיאה");
        }
      });
    }
  }
}
