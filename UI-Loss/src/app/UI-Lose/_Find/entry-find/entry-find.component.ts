import { Component, OnInit, Input } from '@angular/core';
import { Person, WebApiService, Found, Category, Loss } from '../../Service/web-api.service';

@Component({
  selector: 'app-entry-find',
  templateUrl: './entry-find.component.html',
  styleUrls: ['./entry-find.component.scss']
})
export class EntryFindComponent implements OnInit {
  person: Person;
  founds: Array<Found> = new Array();
  losses: Array<Loss> = new Array();
  founds_category: Array<string> = new Array();
  losess_category: Array<string> = new Array();
  category: Array<Category> = new Array();
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    this.person = new Person();
    this._WebApiService.GetAllCategory().then(res => {
      if (res) {
        this.category = res;
      }
    })
  }

  MyArea(pid: string) {
    console.log(pid);
      this._WebApiService.GetFoundsPersonalArea(pid).then(res => {
      if (res) {
        this.founds = res;
      }
    });
    this._WebApiService.GetLosesToPersonalArea(pid).then(res => {
      if (res) {
        this.losses = res;
      }
    });
    if(this.founds.length != null) {
      for (let index = 0; index < this.founds.length; index++) {
        this.founds[index].Category = this.category[this.founds[index].CategoryCode].CategoryDesc;
      }
    }
    if(this.losses.length != null) {
      for (let index = 0; index < this.losses.length; index++) {
        this.losses[index].Category = this.category[this.losses[index].CategoryCode].CategoryDesc;
      }
    }
  }

}

