import { Component, OnInit, Input } from '@angular/core';
import { Person, City, WebApiService } from 'src/app/Service/web-api.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  @Input()
  find_hid: boolean = true;
  find: Person;
  pass: string;
  selectedCity: string;
  city: City;
  cityName: string = 'בני ברק';
  ListCity: Array<City> = new Array<City>();

  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    this.selectedCity = null;
    this.find = new Person();
    this._WebApiService.GetAllCity().then(res => {
      if (res) {
        this.ListCity = res;
      }
    })
    console.log(this.ListCity.length);
  }

  CheckEmail(fid, name, email) {
    window.alert("check")
    this._WebApiService.SendEmail([{ fid }, {}, {}])
    this.pass = "sss";
    console.log(fid)
  }

  selected(city) {
    let i;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.cityName; i++);
    this.find.PersonCityCode = this.ListCity[i].CityCode;
    console.log(city.CityName)
  }

  onChange($event) {
    console.log(this.selectedCity);
    let i;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.selectedCity; i++);
    this.find.PersonCityCode = this.ListCity[i].CityCode;
  }

  SaveUser(f: Person) {
    this._WebApiService.InsertUser(f);
    this._WebApiService.SendEmail(f);
    window.alert("שם משתמש ישלח לאימייל");
  }
}
