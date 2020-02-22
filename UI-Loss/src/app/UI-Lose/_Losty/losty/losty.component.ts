import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WebApiService, Category, Loss, Lose, Color, Signs, Found, City, Person, Find } from '../../Service/web-api.service';
import { AgmMap, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-losty',
  templateUrl: './losty.component.html',
  styleUrls: ['./losty.component.scss']
})
export class LostyComponent implements OnInit {
  geocoder: any;
  selectedColor: string;
  @Input()
  lose_hid: boolean = true;
  isVerifyUser: boolean = false;
  isHidden: boolean = true;
  buttonHidden: boolean = false;
  loss: Loss;
  userName: string;
  status: string = "מאבד";
  email: string;
  selectedCategory: string;
  selectedCity: string;
  today: Date;
  showFounds: boolean = true;
  currentDate: Date = new Date();
  locationLoss: string;
  signs: Signs;
  result: string;
  person: Person = new Person();
  find: Find = new Find();
  ListCity: Array<City> = new Array<City>();
  _Founds: Array<Found> = new Array<Found>();
  _Category: Array<Category> = new Array<Category>();
  _Colors: Array<Color> = new Array<Color>();
  _Status: string[] = ["נמצא", "מבוקש"];

  @ViewChild('mapRef', { static: true }) mapElement: AgmMap;
  @ViewChild('map', { static: true }) public map: AgmMap;
  constructor(private _WebApiService: WebApiService, public mapsApiLoader: MapsAPILoader) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.today = new Date();
    this.loss = new Loss();
    this.selectedColor = null;
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this._Category = res;
    })

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
    this.loss.LossColor = this._Colors[i].ColorCode;
    //this.loss.LossColor = this.selectedColor;
  }

  onChange_Category($event) {
    let i;
    for (i = 1; i < this._Category.length && this.selectedCategory != this._Category[i].CategoryDesc; i++);
    this.loss.CategoryCode = this._Category[i].CategoryCode;
    console.log(this.selectedCategory)
    console.log(this.selectedCategory + "  " + this.loss.CategoryCode.toString())
  }

  onChange_Date($event) {
    this.loss.LossDate = this.currentDate;
    console.log(this.currentDate);
  }

  onChange($event) {
    console.log(this.selectedCity);
    let i;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.selectedCity; i++);
    this.loss.LossCityCode = this.ListCity[i].CityCode;
  }

  Check(userName: string, email: string) {

    this._WebApiService.VerifyUserName([this.status, userName, email]).then(res => {
      if (res == true) {
        this.isHidden = false;
      }
      else {
        window.alert("שם משתמש שגוי");
      }
    });
  }

  getLatlang() {
    let address = this.locationLoss + ' ' + this.selectedCity + ' ' + 'ישראל';
    console.log("address:  " + address)
    this.geocoder.geocode({ 'address': address }, (results) => {
      if (results[0]) {
        console.log(results[0])
        console.log(results[0].geometry.location.lat())
        console.log(results[0].geometry.location.lng())
        this.loss.LossLat = results[0].geometry.location.lat();
        this.loss.LossLng = results[0].geometry.location.lng();
      }
    });
  }

  SaveLoss(l: Loss, currentDate: Date) {
    console.log(this.currentDate);
    console.log(this.today);
    if (this.currentDate > this.today) {
      window.alert("תאריך לא חוקי");
    }
    else {
      l.LoseID = this.userName;
      l.CategoryCode = this.loss.CategoryCode;
      l.LossColor = this.loss.LossColor;
      if (this.loss.LossDesc == null) {
        this.loss.LossDesc = " ";
      }
      if (this.loss.Remarks == null) {
        this.loss.Remarks = " ";
      }
      // l.LossLat = 32;
      // l.LossLng = 34;
      l.StatusCode = 1;
      l.Date = this.today;
      //Insert Loss
      this._WebApiService.InsertLoss(l).then(res => {
        if (res == "Inserting Loss Seccessfuly") {
          window.alert("האבדה התווספה בהצלחה!");
          //Search
          this.signs = new Signs(l.CategoryCode, l.LossDesc, l.LossColor, l.LossDate, l.Remarks);
          this._WebApiService.GetFounds(this.signs).then(res => {
            if (res)
              this._Founds = res;
            this.showFounds = false;
            if (this._Founds.length > 0) {
              for (let i = 0; i < this._Founds.length; i++) {
                this._Founds[i].Category = this._Category[this._Founds[i].CategoryCode - 1].CategoryDesc;
                this._Founds[i].color = this._Colors[this._Founds[i].FoundColor - 1].color;
                this._Founds[i].Status = this._Status[this._Founds[i].StatusCode - 2];
                console.log(this._Founds[i].Category + " " + this._Founds[i].color);
              }
            }
          });
        }
        else {
          window.alert("שגיאה");
        }
      });

    }
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
