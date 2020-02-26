import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WebApiService, Category, Found, Color, City, Signs, Loss, Lose, Person } from '../../Service/web-api.service';
import { AgmMap, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})

export class FoundComponent implements OnInit {
  geocoder: any;
  @Input()
  found_hid: boolean = true;
  isVerifyUser: boolean = false;
  isHidden: boolean = true;
  buttonHidden: boolean = false;
  found: Found;
  userName: string;
  status: string = "מוצא";
  email: string;
  selectedCategory: string;
  selectedColor: string;
  cityName: string;
  selectedCity: string;
  today: Date;
  locationFound: string;
  result: string;
  resultSend: string;
  showLosses: boolean = true;
  currentDate: Date = new Date();
  // constructor(private _WebApiService: WebApiService) { }
  signs: Signs = new Signs();
  person: Person = new Person();
  lose: Lose = new Lose();
  ListCity: Array<City> = new Array<City>();
  _Losses: Array<Loss> = new Array<Loss>();
  _Category: Array<Category> = new Array<Category>();
  _Colors: Array<Color> = new Array<Color>();
  _Status: string[] = ["נאבד", "מבוקש"];

  @ViewChild('mapRef', { static: true }) mapElement: AgmMap;
  @ViewChild('map', { static: true }) public map: AgmMap;
  constructor(private _WebApiService: WebApiService, public mapsApiLoader: MapsAPILoader) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    // console.log(this.today);
    this.today = new Date();
    this.found = new Found();
    this.selectedColor = null;
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this._Category = res;
    })
    console.log(this._Category.length);

    this._WebApiService.GetColors().then(res => {
      if (res)
        this._Colors = res;
      console.log(this._Colors.length);
    })

    this._WebApiService.GetAllCity().then(res => {
      if (res)
        this.ListCity = res;
    })
  }

  onChange_Color($event) {
    console.log(this.selectedColor);
    let i;
    for (i = 1; i < this._Colors.length && this.selectedColor != this._Colors[i].color; i++);
    this.found.FoundColor = this._Colors[i].ColorCode;
    //this.found.FoundColor = this.selectedColor;
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
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.selectedCity; i++);
    this.found.FoundCityCode = this.ListCity[i].CityCode;
  }

  Check(userName: string, email: string) {
    // console.log("Check   id" + id.toString() + "pass  " + userName.toString() + "email  " + email.toString());
    // if (this._WebApiService.VerifyUserName([{Value: status, Name: "status"}, {Value: id, Name: "id"}, {Value: userName, Name: "userName"}, {Value: email, Name: "email"}]) == true)

    this._WebApiService.VerifyUserName([this.status, userName, email]).then(res => {
      if (res == true) {
        this.isHidden = false;
      }
      else {
        window.alert("שם משתמש שגוי");
      }
      // this.isSave.emit(false); 
    });
    //this.isVerifyUser = this._WebApiService.VerifyUserName([this.status, id, userName, email]);
    // if(this.isVerifyUser == true) {
    // console.log("====" + this.isHidden);
    // this.isHidden = false;
    // }
    //     else {
    //   window.alert("שם משתמש שגוי");
    // }
    // console.log(this.isHidden);
  }

  selected(city) {
    let i;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.cityName; i++);
    this.found.FoundCityCode = this.ListCity[i].CityCode;
    console.log(city.CityName)
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
  // this.location.ListLosty[this.location.ListLosty.length] = {
  //   lat:results[0].geometry.location.lat(),
  //   lng:results[0].geometry.location.lng(),
  //   name:'צמיד',
  //   address: address,
  //   icon:'//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',

  // }

  //  this.mapElement.triggerResize();
  // debugger;
  // this.clickPlace = {
  //   lat: event.coords.lat,
  //   lng: event.coords.lng,
  //   isOpen: true,
  //   address: results[0].formatted_address,
  //   shortAddress: results[0].formatted_address.replace("ישראל", ''),
  //   iscollectPoint: true,
  // }
  //     }
  //   });


  SaveFound(f: Found, currentDate: Date) {
    console.log(this.currentDate);
    console.log(this.today);
    if (this.currentDate > this.today) {
      window.alert("תאריך לא חוקי");
    }
    else {
      f.FindID = this.userName;
      f.CategoryCode = this.found.CategoryCode;
      f.FoundColor = this.found.FoundColor;
      if (this.found.FoundDesc == null) {
        this.found.FoundDesc = " ";
      }
      if (this.found.Remarks == null) {
        this.found.Remarks = " ";
      }
      f.StatusCode = 2;
      f.Date = this.today;
      this._WebApiService.InsertFound(f).then(res => {
        if (res == "Inserting Found Seccessfuly") {
          window.alert("המציאה התווספה בהצלחה!");
          //Search
          this.signs = new Signs(f.CategoryCode, f.FoundDesc, f.FoundColor, f.FoundDate, f.Remarks);
          this._WebApiService.SearchLosses(this.signs).then(res => {
            if (res)
              this._Losses = res;
            this.showLosses = false;
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

  SelectLoss(l: Loss) {
    console.log(l.LossCode);
    this.person.PersonID = l.LoseID;
    l.StatusCode = 3;
    this._WebApiService.GetLose(this.person).then(res => {
      if (res) {
        this.lose = res;
      }
    })
    this._WebApiService.ChangeLossStatus(l).then(res => {
      this.result = res;
    });
    this._WebApiService.SendEmailMessage(this.person).then(res => {
      this.resultSend = res;
      console.log(this.resultSend);
    })
    this.buttonHidden = true;
  }

  Select() {
    // debugger;
    // if (this.result == "Data updated!") {  
    window.alert("פרטי מאבד:                                                                         " + " שם: " + this.lose.LoseName + " טלפון: " + this.lose.LosePhone + " אימייל: " + this.lose.LoseEmail)
    // }
  }
}



// /**/_xdc_._7dl43b && _xdc_._7dl43b( {results: [{address_components: [{long_name: "8", short_name: "8", types: ["street_number"]},…],…}],…} )
// results: [{address_components: [{long_name: "8", short_name: "8", types: ["street_number"]},…],…}]
// 0: {address_components: [{long_name: "8", short_name: "8", types: ["street_number"]},…],…}
// address_components: [{long_name: "8", short_name: "8", types: ["street_number"]},…]
// formatted_address: "Avnei Nezer St 8, Bnei Brak, Israel"
// geometry: {location: {lat: 32.0834083, lng: 34.8424401}, location_type: "ROOFTOP",…}
// location: {lat: 32.0834083, lng: 34.8424401}
// lat: 32.0834083
// lng: 34.8424401     
// location_type: "ROOFTOP"
// viewport: {northeast: {lat: 32.08475728029151, lng: 34.84378908029149},…}
// place_id: "ChIJl0YQRhhKHRURxdQ7bhqWoAY"
// plus_code: {compound_code: "3RMR+9X Bnei Brak, Israel", global_code: "8G4P3RMR+9X"}
// types: ["street_address"]
// status: "OK"


// /**/_xdc_._clotnj && _xdc_._clotnj( {,…} )
// results: [{address_components: [{long_name: "15", short_name: "15", types: ["street_number"]},…],…}]
// 0: {address_components: [{long_name: "15", short_name: "15", types: ["street_number"]},…],…}
// address_components: [{long_name: "15", short_name: "15", types: ["street_number"]},…]
// formatted_address: "Har Sinai St 15, Bnei Brak, Israel"
// geometry: {location: {lat: 32.074059, lng: 34.8404918}, location_type: "ROOFTOP",…}
// location: {lat: 32.074059, lng: 34.8404918}
// lat: 32.074059
// lng: 34.8404918
// location_type: "ROOFTOP"
// viewport: {northeast: {lat: 32.07540798029149, lng: 34.84184078029151},…}
// place_id: "ChIJPZWwYxVKHRURKOEFuTVhBKE"
// plus_code: {compound_code: "3RFR+J5 Bnei Brak, Israel", global_code: "8G4P3RFR+J5"}
// types: ["street_address"]
// status: "OK"















// formatted_address: "Tel Yokneam"
// geometry: {location: {lat: 32.641111, lng: 35.108333}, location_type: "APPROXIMATE",…}
// location: {lat: 32.641111, lng: 35.108333}
// lat: 32.641111
// lng: 35.108333