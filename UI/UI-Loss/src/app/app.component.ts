import { Component } from '@angular/core';
import { Person, DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UI-Loss';
  userName: string;
  login: boolean = true;
  status: string;
  person: Person = new Person();

  constructor(private _data: DataService) { }

  Login() {
    this._data.VerifyUserName([this.status, this.userName, this.person.PersonEmail]).then(res => {
      if (res == true) {
        localStorage.setItem('auth', JSON.stringify({ userName: this.userName, Person: this.person }));
        this.login = false;
        //pop up
      }
    })

  }
}
