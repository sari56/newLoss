import { Component, OnInit, ViewChild } from '@angular/core';
import { Found, Signs, Category, Color, City, Loss, DataService, User, Person, Find } from 'src/app/services/data.service';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { constructor } from 'q';
declare var google: any;
@Component({
  selector: 'app-loss',
  templateUrl: './loss.component.html',
  styleUrls: ['./loss.component.scss']
})
export class LossComponent implements OnInit {
  geocoder: any;
  locationLoss: string;
  selectedColor: string;
  selectedCategory: string;
  selectedCity: string;
  currentDate: Date;
  loss: Loss = new Loss();
  signs: Signs = new Signs();
  _Category: Array<Category> = new Array<Category>();
  _Colors: Array<Color> = new Array<Color>();
  _City: Array<City> = new Array();
  _Losses: Array<Loss> = new Array();
  _Status: string[] = ["נאבד", "מבוקש"];
  buttonHidden: boolean = false;
  message: string = '';
  person: Person = new Person();
  find: Find = new Find();
  result: string;
  showFounds: boolean = true;
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
    this.loss.LossColor = this._Colors[i].ColorCode;
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
    for (i = 1; i < this._City.length && this._City[i].CityName != this.selectedCity; i++);
    this.loss.LossCityCode = this._City[i].CityCode;
  }

  getLatlang(l: Loss, currentDate: Date) {
    let address = this.locationLoss + ' ' + this.selectedCity + ' ' + 'ישראל';
    console.log("address:  " + address)
    this.geocoder.geocode({ 'address': address }, (results) => {
      if (results[0]) {
        console.log(results[0])
        console.log(results[0].geometry.location.lat())
        console.log(results[0].geometry.location.lng())
        this.loss.LossLat = results[0].geometry.location.lat();
        this.loss.LossLng = results[0].geometry.location.lng();
        this.SaveFound(l, currentDate);
      }
    });
  }

  SaveFound(l: Loss, currentDate: Date) {
    const auth: User = JSON.parse(localStorage.getItem('auth'));
    l.LoseID = auth.personID;
    l.CategoryCode = this.loss.CategoryCode;
    l.LossColor = this.loss.LossColor;
    if (this.loss.LossDesc == null) {
      this.loss.LossDesc = " ";
    }
    if (this.loss.Remarks == null) {
      this.loss.Remarks = " ";
    }
    l.StatusCode = 2;
    l.Date = new Date();
    this._data.InsertLoss(l).then(res => {
      if (res == "Inserting Found Seccessfuly") {
        window.alert("המציאה התווספה בהצלחה!");
        //Search
        this.signs = new Signs(l.CategoryCode, l.LossDesc, l.LossColor, l.LossDate, l.Remarks);
        this._data.SearchLosses(this.signs).then(res => {
          if (res)
            this._Losses = res;
           this.showFounds = false;
          for (let i = 0; i < this._Losses.length; i++) {
            this._Losses[i].Category = this._Category[this._Losses[i].CategoryCode - 1].CategoryDesc;
            this._Losses[i].color = this._Colors[this._Losses[i].LossColor - 1].color;
            this._Losses[i].Status = this._Status[this._Losses[i].StatusCode - 1];
            console.log(this._Losses[i].Category + " " + this._Losses[i].color);
          }
        });
      }
    });
  }

  SelectFound(f: Found) {
    console.log(f.FoundCode);
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
    // this.buttonHidden = true;
  }

  Select() {
    window.alert("פרטי מוצא האבדה:                                                                         " + " שם: " + this.find.FindName + " טלפון: " + this.find.FindPhone + " אימייל: " + this.find.FindEmail)
  }
}




