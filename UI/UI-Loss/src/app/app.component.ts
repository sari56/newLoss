import { Component } from '@angular/core';
import { Person, DataService } from './services/data.service';
import { Router } from '@angular/router';

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

  constructor(private _data: DataService, private _router: Router) { }

  Login() {
    console.log(this.userName + "  " + this.person.PersonEmail)
    this._data.VerifyUserName([this.userName, this.person.PersonEmail]).then(res => {
       if (res != null) {
        localStorage.setItem('auth', JSON.stringify({ userName: this.userName, Person: res }));
        this.login = false;
        this._router.navigateByUrl('home');
          document.getElementById('id01').style.display='none'
        //pop up
      }
      else {
        window.alert("שגיאה")
      }
    })
  }
}
