import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { WebApiService, City, Found, Category, Person, Find } from '../../Service/web-api.service';
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
  ListCity: Array<City> = new Array<City>();
  ListCategory: Array<Category> = new Array<Category>();
  ListFound: Array<Found> = new Array<Found>();
  icon: any;

  // @ViewChild(AgmMap) map: AgmMap;
  // neither @ViewChild(AgmMap) public map;
  @ViewChild('mapRef') mapElement: AgmMap;
  @ViewChild('map', { static: true }) public map: AgmMap;
  constructor(private _WebApiService: WebApiService, public mapsApiLoader: MapsAPILoader) {
    // debugger;
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    //Get City
    this._WebApiService.GetAllCity().then(res => {
      if (res) {
        this.ListCity = res;
      }
    })
    //Get Category
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
    //Get Founds
    this._WebApiService.GetLosses().then(res => {
      if (res) {
        this.ListFound = res;
      }
    })
    //init category
    let i;
    for (i = 0; i < this.ListFound.length; i++) {
      this.ListFound[i].Category = this.ListCategory[this.ListFound[i].CategoryCode - 1].CategoryDesc;
      console.log(this.ListFound[i].Category)
      console.log(this.ListFound[i].Category)
    }
    console.log(this.ListCity)
    console.log(this.ListFound)
  }

  onChange($event) {
    console.log(this.ListCity)
    console.log("selected city" + this.selectedCity);
    let i;
    for (i = 0; i < this.ListCity.length && this.ListCity[i].CityName != this.selectedCity; i++);
    this.city = this.ListCity[i];
    console.log(this.ListCity[i])
    console.log(this.city);
    this.icon = '//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  }

  getLatlang() {
    for (let i = 82; i < 92; i++) {
      let address = this.ListCity[i].CityName + ' ' + 'ישראל';
      console.log("address:  " + address)
      this.geocoder.geocode({ 'address': address }, (results) => {
        if (results[0]) {
          console.log(results[0])
          console.log(results[0].geometry.location.lat())
          console.log(results[0].geometry.location.lng())
          this.ListCity[i].Lat = results[0].geometry.location.lat();
          this.ListCity[i].Lng = results[0].geometry.location.lng();
        }
      });     
    }
    console.log(this.ListCity)
  }

  SelectFound(f: Found) {
    console.log(f.FoundCode);
    this.person.PersonID = f.FindID;
    f.StatusCode = 3;
    this._WebApiService.GetFind(this.person).then(res => {
      if (res) {
        this.find = res;
      }
    })
    this._WebApiService.ChangeFoundStatus(f).then(res => {
      this.result = res;
    });
    this.buttonHidden = true;
  }

  Select() {
    // debugger;
    // if (this.result == "Data updated!") {  
      window.alert("פרטי מוצא האבדה:                                                                         " + " שם: " + this.find.FindName + " טלפון: " + this.find.FindPhone + " אימייל: " + this.find.FindEmail)
    // }
  }

}