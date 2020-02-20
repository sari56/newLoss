import { Component, OnInit } from '@angular/core';
import { WebApiService, Person, Category, Color, Found, Loss, Find, Lose } from '../../Service/web-api.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {
  userID: string;
  showArea: boolean = true;
  foundHidden: boolean = true;
  lossHidden: boolean = true;
  editHidden: boolean = true;
  person: Person = new Person();
  find: Find = new Find();
  lose: Lose = new Lose();
  category: Array<Category> = new Array();
  Colors: Array<Color> = new Array<Color>();
  _Status: string[] = ["נאבד","נמצא", "מבוקש","הוחזר"];
  founds: Array<Found> = new Array();
  losses: Array<Loss> = new Array();
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
  }

  MyArea() {
    //check id
   this.person.PersonID = this.userID;

    // this.showArea = false;
    console.log(this.person.PersonID);

      this._WebApiService.VerifyUserId(this.person).then(res => {
        if (res == true) {
          this.showArea = false;
        }
        else {
          window.alert("משתמש לא קיים במערכת");
        }
      })
    this._WebApiService.GetAllCategory().then(res => {
      if (res) {
        this.category = res;
      }
    })

    this._WebApiService.GetColors().then(res => {
      if (res)
        this.Colors = res;
      console.log(this.Colors.length);
    })
    this.person.PersonID = this.userID;
    console.log(this.userID);
    console.log(this.person.PersonID);
    //found
    this._WebApiService.GetFoundsPersonalArea(this.person).then(res => {
      if (res) {
        this.founds = res;
        for (let index = 0; index < this.founds.length; index++) {
          this.founds[index].Category = this.category[this.founds[index].CategoryCode - 1].CategoryDesc;
          this.founds[index].color = this.Colors[this.founds[index].FoundColor - 1].color;
          this.founds[index].Status = this._Status[this.founds[index].StatusCode - 1];
          console.log(this.founds[index].Category);
        }
      }
    });
    //loss
    this._WebApiService.GetLosesToPersonalArea(this.person).then(res => {
      if (res) {
        this.losses = res;
        for (let index = 0; index < this.losses.length; index++) {
          this.losses[index].Category = this.category[this.losses[index].CategoryCode - 1].CategoryDesc;
          console.log(this.losses[index].Category)
          this.losses[index].color = this.Colors[this.losses[index].LossColor - 1].color;
          this.losses[index].Status = this._Status[this.losses[index].StatusCode - 1];
          console.log(this.losses[index].color)
        }
      }
    });
  }

  ShowFounds() {
    this.lossHidden = true;
    this.editHidden = true;
    this.foundHidden = false;
  }

  ShowLosses() {
    this.editHidden = true;
    this.foundHidden = true;
    this.lossHidden = false;
  }

  ShowEdit() {
    this.foundHidden = true;
    this.lossHidden = true;
    this._WebApiService.GetUser(this.person).then(res => {
      if (res) {
        this.find = res;
        this.person = new Person
        (this.find.FindID, this.find.FindName, this.find.FindCityCode, this.find.FindAddress, this.find.FindPhone, this.find.FindEmail);
      }
    })

    this.editHidden = false;
    console.log("=======" + this.find.FindName)
  }
}
