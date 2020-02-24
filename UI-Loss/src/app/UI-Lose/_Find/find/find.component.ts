import { Component, OnInit, Input, resolveForwardRef } from '@angular/core';
import { WebApiService, City, Person, Find } from '../../Service/web-api.service';


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
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
    // this.find=new Find();
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
    // מייל אוטומטי
    this._WebApiService.SendEmail([{ fid }, {}, {}])
    this.pass = "sss";
    // this._LocalStorage.Password=fid;
    // +" "+this.pass;
    console.log(fid)
  }

  selected(city) {
    let i;
    //  for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName!=this._CityName; i++);
    // this.find.FindCityCode=this.ListCity[i].CityCode;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.cityName; i++);
    this.find.PersonCityCode = this.ListCity[i].CityCode;
    console.log(city.CityName)
  }

  onChange($event) {
    console.log(this.selectedCity);
    let i;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.selectedCity; i++);
    this.find.PersonCityCode = this.ListCity[i].CityCode;
    // console.log(this.city.CityName);

    // I want to do something here for new selectedDevice, but what I
    // got here is always last selection, not the one I just select.
  }

  SaveUser(f: Person) {
    //   this._WebApiService.GetCityCode([{Value : cityName}]).then(res=>{
    //   if(res)
    //   f.FindCityCode=res;
    // });
    this._WebApiService.InsertUser(f);
    this._WebApiService.SendEmail(f);
    window.alert("שם משתמש ישלח לאימייל");
    // this._WebApiService.Insert([{ID: f.PersonID} , {Name: f.PersonName} , {Code: "19"} , {Address: f.PersonAddress} , {Phone: f.PersonPhone} , {Email: f.PersonEmail}]);
  }

  Check(femail: string) {
    console.log("email:  " + this._WebApiService.CheckEmail(femail))
    return this._WebApiService.CheckEmail(femail);
  }

  emailIsValid(email) {
    console.log(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  //   filterForeCasts(filterVal: any) {
  //     if (filterVal == "0")
  //         this.forecasts = this.cacheForecasts;
  //     else
  //     this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
  // }
}
