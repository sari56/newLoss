import { Component, OnInit } from '@angular/core';
import { WebApiService, Person } from '../../Service/web-api.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {
  userId: string;
  showArea: boolean = true;
  foundHidden: boolean = true;
  person: Person = new Person();
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
  }

  MyArea() {
    //check id
    this.person.PersonID = this.userId;
    this.showArea = false;
    console.log(this.person.PersonID);
    //   this._WebApiService.VerifyUserId(this.person).then(res => {
    //     if (res == true) {
    //       this.showArea = false;
    //     }
    //     else {
    //       window.alert("משתמש לא קיים במערכת");
    //     }
    //   })

  }

  ShowFounds() {
    this.foundHidden = false;
  }
}
