import { Component, OnInit, ViewChild } from '@angular/core';
import { City, Category, Color, DataService, Found, Signs, Loss, Person, User } from 'src/app/services/data.service';
import { AgmMap, MapsAPILoader } from '@agm/core';
 declare var google: any;
@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})
export class FoundComponent implements OnInit {
  geocoder: any;
 
  locationFound: string;
  selectedColor: string;
  selectedCategory: string;
  selectedCity: string;
  currentDate: Date;
  found: Found = new Found();
  signs: Signs = new Signs();
  _Category: Array<Category> = new Array<Category>();
  _Colors: Array<Color> = new Array<Color>();
  _City: Array<City> = new Array();
  _Losses: Array<Loss> = new Array();
  _Status: string[] = ["נאבד", "מבוקש"];

  // constructor(private _data: DataService) { }
  @ViewChild('mapRef', { static: true }) mapElement: AgmMap;
  @ViewChild('map', { static: true }) public map: AgmMap;
  constructor(private _data: DataService, public mapsApiLoader: MapsAPILoader) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this._data.GetAllCategory().then(res => {
      if (res)
        this._Category = res;
    })

    this._data.GetColors().then(res => {
      if (res)
        this._Colors = res;
      console.log(this._Colors.length);
    })

    this._data.GetAllCity().then(res => {
      if (res)
        this._City = res;
    })
  }

  onChange_Color($event) {
    console.log(this.selectedColor);
    let i;
    for (i = 1; i < this._Colors.length && this.selectedColor != this._Colors[i].color; i++);
    this.found.FoundColor = this._Colors[i].ColorCode;
  }

  onChange_Category($event) {
    let i;
    for (i = 1; i < this._Category.length && this.selectedCategory != this._Category[i].CategoryDesc; i++);
    this.found.CategoryCode = this._Category[i].CategoryCode;
    console.log(this.selectedCategory)
    console.log(this.selectedCategory + "  " + this.found.CategoryCode.toString())
  }

  onChange_Date($event) {
    this.found.FoundDate = this.currentDate;
    console.log(this.currentDate);
  }

  onChange($event) {
    console.log(this.selectedCity);
    let i;
    for (i = 1; i < this._City.length && this._City[i].CityName != this.selectedCity; i++);
    this.found.FoundCityCode = this._City[i].CityCode;
  }

  getLatlang(f: Found, currentDate: Date) {
    let address = this.locationFound + ' ' + this.selectedCity + ' ' + 'ישראל';
    console.log("address:  " + address)
    this.geocoder.geocode({ 'address': address }, (results) => {
      if (results[0]) {
        console.log(results[0])
        console.log(results[0].geometry.location.lat())
        console.log(results[0].geometry.location.lng())
        this.found.FoundLat = results[0].geometry.location.lat();
        this.found.FoundLng = results[0].geometry.location.lng();
        this.SaveFound(f, currentDate);
      }
    });
  }

  SaveFound(f: Found, currentDate: Date) {
    const auth: User = JSON.parse(localStorage.getItem('auth'));
    f.FindID = auth.personID;
    f.CategoryCode = this.found.CategoryCode;
    f.FoundColor = this.found.FoundColor;
    if (this.found.FoundDesc == null) {
      this.found.FoundDesc = " ";
    }
    if (this.found.Remarks == null) {
      this.found.Remarks = " ";
    }
    f.StatusCode = 2;
    f.Date = new Date();
    this._data.InsertFound(f).then(res => {
      if (res == "Inserting Found Seccessfuly") {
        window.alert("המציאה התווספה בהצלחה!");
        //Search
        this.signs = new Signs(f.CategoryCode, f.FoundDesc, f.FoundColor, f.FoundDate, f.Remarks);
        this._data.SearchLosses(this.signs).then(res => {
          if (res)
            this._Losses = res;
          // this.showLosses = false;
          for (let i = 0; i < this._Losses.length; i++) {
            this._Losses[i].Category = this._Category[this._Losses[i].CategoryCode - 1].CategoryDesc;
            this._Losses[i].color = this._Colors[this._Losses[i].LossColor - 1].color;
            this._Losses[i].Status = this._Status[this._Losses[i].StatusCode - 1];
            console.log(this._Losses[i].Category + " " + this._Losses[i].color);
          }
        });
      }
      else {
        window.alert("שגיאה");
      }
    });
  }
}

  // formatted_address: "David Ben Gurion St, Giv'at Shmuel, Israel"
  // geometry: {,…}
  // bounds: {northeast: {lat: 32.0801593, lng: 34.848275}, southwest: {lat: 32.0752006, lng: 34.8451704}}
  // location: {lat: 32.0777559, lng: 34.846858}