import { Component, OnInit } from '@angular/core';
import { City, DataService, Person } from 'src/app/services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  selectedCity: string;
  city: City;
  boolEmail: number = 1;
  _City: Array<City> = new Array();
  person: Person;
  result: string;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this.person = new Person();
    this.selectedCity = null;
    this._data.GetAllCity().then(res => {
      if (res) {
        this._City = res;
      }
    })
  }
  onChange($event) {
    console.log(this.selectedCity);
    let i;
    for (i = 1; i < this._City.length && this._City[i].CityName != this.selectedCity; i++);
    this.person.PersonCityCode = this._City[i].CityCode;

  }

  SaveUser(person: Person) {
    // if (!this.boolEmail) {
    this._data.InsertUser(this.person).then(res => {
      if (res == "Inserting Data Successfully") {
        this._data.SendEmail(this.person).then(res => {
          if (res != null) {
            this.result = res;
            window.alert("שם משתמש ישלח לאימייל");
          }
          else
            window.alert("כתובת המייל אינה חוקית");
        });
      }
    });
    //pop up
  }
}
