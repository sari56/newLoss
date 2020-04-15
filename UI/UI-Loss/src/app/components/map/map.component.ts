import { Component, OnInit, ViewChild } from '@angular/core';
import { Person, Find, City, Category, Found, DataService } from 'src/app/services/data.service';
import { AgmMap, MapsAPILoader } from '@agm/core';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  geocoder: any;
  zoom: number = 15;
  selectedCity: string;
  result: string;
  buttonHidden: boolean = false;
  person: Person = new Person();
  find: Find = new Find();
  city: City = new City();
  _City: Array<City> = new Array<City>();
  _Category: Array<Category> = new Array<Category>();
  _Found: Array<Found> = new Array<Found>();
  icon: any;
  message: string = "";

  @ViewChild('mapRef', { static: true }) mapElement: AgmMap;
  @ViewChild('map', { static: true }) public map: AgmMap;
  constructor(private _data: DataService, public mapsApiLoader: MapsAPILoader) {
    // debugger;
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.icon = '//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    this.city.Lat = 32.0340049;
    this.city.Lng = 34.885946500000045;
    //Get City
    this._data.GetAllCity().then(res => {
      if (res) {
        this._City = res;
      }
    })
    //Get Category
    this._data.GetAllCategory().then(res => {
      if (res)
        this._Category = res;
    })
    //Get Founds
    this._data.GetLosses().then(res => {
      if (res) {
        this._Found = res;
      }
    })
    //init category
    let i;
    for (i = 0; i < this._Found.length; i++) {
      this._Found[i].Category = this._Category[this._Found[i].CategoryCode - 1].CategoryDesc;
      console.log(this._Found[i].Category)
      console.log(this._Found[i].Category)
    }
    console.log(this._City)
    console.log(this._Found)
  }

  onChange($event) {
    console.log(this._City)
    console.log("selected city" + this.selectedCity);
    let i;
    for (i = 0; i < this._City.length && this._City[i].CityName != this.selectedCity; i++);
    this.city = this._City[i];
    console.log(this._City[i])
    console.log(this.city);
    // this.icon = {
    //  url: '/assets/svg/headphones.svg',
    //  scaledSize: {
    //    width:20,
    //    height:20 
    //  }
    // } 
    
    console.log(this._Found)
  }

  getLatlang() {
    for (let i = 41; i < 52; i++) {
      let address = this._City[i].CityName + ' ' + 'ישראל';
      console.log("address:  " + address)
      this.geocoder.geocode({ 'address': address }, (results) => {
        if (results[0]) {
          console.log(results[0])
          console.log(results[0].geometry.location.lat())
          console.log(results[0].geometry.location.lng())
          this._City[i].Lat = results[0].geometry.location.lat();
          this._City[i].Lng = results[0].geometry.location.lng();
        }
      });
    }
  }

  SelectFound(f: Found) {
    console.log(f.FoundCode);
    console.log(this._Found)
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

  //  window.alert("פרטי מוצא האבדה: " + " שם: " + this.find.FindName + " טלפון: " + this.find.FindPhone + " אימייל: " + this.find.FindEmail)
  }

}
