import { Component, OnInit, Input } from '@angular/core';
import { WebApiService, Category, Loss, Lose } from '../../Service/web-api.service';

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
  ngOnInit() {
    this.today = new Date();
    this.loss = new Loss();
    this.selectedColor = null;
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
    console.log(this.ListCategory.length);
  }

  onChange_Color($event) {
    console.log(this.selectedColor);
    this.loss.LossColor = this.selectedColor;
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

  Check(id: string, userName: string, email: string) {

    this._WebApiService.VerifyUserName([this.status, id, userName, email]).then(res => {
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
      // f.FoundCode = 1;
      l.CategoryCode = this.loss.CategoryCode;
      l.Loss_X = 1;
      l.Loss_Y = 1;
      // f.PictureCode = 1;
      l.LossDesc =" ";
      l.StatusCode = 2;
      l.LossColor = this.loss.LossColor;
      l.Date = this.today;
      this._WebApiService.InsertLoss(l).then(res => {
        if (res == "Inserting Loss Seccessfuly") {
          window.alert("המציאה התווספה בהצלחה!");
        }
        else {
          window.alert("שגיאה");
        }
      });
    }
  }
}
