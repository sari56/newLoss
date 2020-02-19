import { Component, OnInit, Input } from '@angular/core';
import { Find, City, WebApiService, Person } from '../../Service/web-api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input()
  FIND: Find = new Find;
  @Input()
  PERSON: Person = new Person();
  isEdit: boolean = true;
  selectedCity: string;
  result: string;
  ListCity: Array<City> = new Array<City>();
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
   
    this._WebApiService.GetAllCity().then(res => {
      if (res) {
        this.ListCity = res;
      }
    })
  }

  onChange($event) {
    console.log(this.selectedCity);
    let i;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.selectedCity; i++);
    this.FIND.FindCityCode = this.ListCity[i].CityCode;
  }

  ChangeDetials() {
    console.log(this.PERSON)
    console.log(this.FIND);
    if (this.PERSON.PersonEmail != this.FIND.FindEmail) {
      this.PERSON.PersonEmail = this.FIND.FindEmail;
      this._WebApiService.SendEmail(this.PERSON).then(res => {
        if (res != "true") {
          this.isEdit = false;
          window.alert("אימייל שגוי")
        }
        else {
          window.alert("שם משתמש ישלח לאימייל");
        }
      })
    }

    if(this.isEdit == true) {
      this._WebApiService.EditUser(this.FIND)
      // .then(res => {
      // this.result = res;
    //   console.log(this.result);
    // })
    }
  }
}
