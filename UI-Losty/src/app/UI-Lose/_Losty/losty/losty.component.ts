import { Component, OnInit, Input } from '@angular/core';
import { WebApiService, Category, Loss, Lose, Color } from '../../Service/web-api.service';

@Component({
  selector: 'app-losty',
  templateUrl: './losty.component.html',
  styleUrls: ['./losty.component.scss']
})
export class LostyComponent implements OnInit {
  selectedColor: string;
  @Input()
  lose_hid: boolean = true;
  isVerifyUser: boolean = false;
  isHidden: boolean = true;
  loss: Loss;
  userName: string;
  status: string = "מאבד";
  email: string;
  selectedCategory: string;
  today: Date;
  currentDate: Date = new Date();
  constructor(private _WebApiService: WebApiService) { }
  ListCategory: Array<Category> = new Array<Category>();
  Colors: Array<Color> = new Array<Color>();
  ngOnInit() {
    this.today = new Date();
    this.loss = new Loss();
    this.selectedColor = null;
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
    
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
    this.loss.LossColor = this.Colors[i].ColorCode;
    //this.loss.LossColor = this.selectedColor;
  }

  onChange_Category($event) {
    let i;
    for (i = 1; i < this.ListCategory.length && this.selectedCategory != this.ListCategory[i].CategoryDesc; i++);
    this.loss.CategoryCode = this.ListCategory[i].CategoryCode;
    console.log(this.selectedCategory)
    console.log(this.selectedCategory + "  " + this.loss.CategoryCode.toString())
  }

  onChange_Date($event) {
    this.loss.LossDate = this.currentDate;
    console.log(this.currentDate);
  }

  Check(userName: string, email: string) {

    this._WebApiService.VerifyUserName([this.status, userName, email]).then(res => {
      if (res == true) {
        this.isHidden = false;
      }
      else {
        window.alert("שם משתמש שגוי");
      }
    });
  }

  SaveLoss(l: Loss, currentDate: Date) {
    console.log(this.currentDate);
    console.log(this.today);
    if (this.currentDate > this.today) {
      window.alert("תאריך לא חוקי");
    }
    else {
      l.LoseID = this.userName;
      l.CategoryCode = this.loss.CategoryCode;
      l.LossColor = this.loss.LossColor;
      l.Loss_X = 1;
      l.Loss_Y = 1;
      l.StatusCode = 1;
      l.Date = this.today;
      this._WebApiService.InsertLoss(l).then(res => {
        if (res == "Inserting Loss Seccessfuly") {
          window.alert("האבדה התווספה בהצלחה!");
        }
        else {
          window.alert("שגיאה");
        }
      });
    }
  }
}
