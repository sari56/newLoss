import { Component, OnInit, Input } from '@angular/core';
// import { Lose } from '../../Lose';
import { WebApiService, City, Person } from '../../Service/web-api.service';
// import { City } from '../../City';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.scss']
})

export class LoseComponent implements OnInit {
  lose: Person;
  ListCity: Array<City> = new Array<City>();
  selectedCity: string;
  cityName: string;
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    this.lose=new Person();
    this._WebApiService.GetAllCity().then(res=>{
      if(res)
        this.ListCity = res;
    })
  }

  selected(city) {
    let i;
    //  for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName!=this._CityName; i++);
    // this.find.FindCityCode=this.ListCity[i].CityCode;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.cityName; i++);
    this.lose.PersonCityCode = this.ListCity[i].CityCode;
    console.log(city.CityName)
  }

  onChange($event) {
    console.log(this.selectedCity);
    let i;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.selectedCity; i++);
    this.lose.PersonCityCode = this.ListCity[i].CityCode;
  }

  SaveUser(l: Person) {
    this._WebApiService.InsertUser(l);
    this._WebApiService.SendEmail(l);
    window.alert("שם משתמש ישלח לאימייל");
  }

}
