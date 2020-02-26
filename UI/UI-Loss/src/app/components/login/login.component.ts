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
  ListCity: Array<City> = new Array<City>();
  person: Person = new Person();
  result: string;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this.selectedCity = null;
    this._data.GetAllCity().then(res => {
      if (res) {
        this.ListCity = res;
      }
    })
  }
  onChange($event) {
    console.log(this.selectedCity);
    let i;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.selectedCity; i++);
    this.person.PersonCityCode = this.ListCity[i].CityCode;

  }


  SaveUser(p: Person) {
    // if (!this.boolEmail) {
      this._data.InsertUser(p);
      this._data.SendEmail(p).then(res =>{
        if(res!= null) {
          this.result = res;
          // window.alert("שם משתמש ישלח לאימייל");

        }
        else
      window.alert("כתובת המייל אינה חוקית");
      });
    // }
    
      //pop up
    
    
  }
}
