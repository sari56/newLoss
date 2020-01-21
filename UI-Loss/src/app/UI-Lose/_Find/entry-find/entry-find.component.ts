import { Component, OnInit, Input } from '@angular/core';
import { Person, WebApiService, Found, Category, Loss, Color } from '../../Service/web-api.service';

@Component({
  selector: 'app-entry-find',
  templateUrl: './entry-find.component.html',
  styleUrls: ['./entry-find.component.scss']
})
export class EntryFindComponent implements OnInit {
  person: Person;
  isHidden: boolean = true;
  founds: Array<Found> = new Array();
  losses: Array<Loss> = new Array();
  founds_category: Array<string> = new Array();
  losess_category: Array<string> = new Array();
  category: Array<Category> = new Array();
  Colors: Array<Color> = new Array<Color>();
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    this.person = new Person();
    this._WebApiService.GetAllCategory().then(res => {
      if (res) {
        this.category = res;
      }
    })

    this._WebApiService.GetColors().then(res => {
      if (res)
        this.Colors = res;
      console.log(this.Colors.length);
    })
  }

  MyArea(pid: string) {
    console.log(pid);
    // console.log(this.isHidden);
    // this.isHidden = false;
    // console.log(this.isHidden);
    this.person.PersonID = pid;
    this._WebApiService.GetFoundsPersonalArea(this.person).then(res => {
      if (res) {
        this.founds = res;
        for (let index = 0; index < this.founds.length; index++) {
          this.founds[index].Category = this.category[this.founds[index].CategoryCode - 1].CategoryDesc;
          this.founds[index].color = this.Colors[this.founds[index].FoundColor - 1].color;
          console.log(this.founds[index].Category);
        }
      }
    });
    this._WebApiService.GetLosesToPersonalArea(this.person).then(res => {
      if (res) {
        this.losses = res;
        for (let index = 0; index < this.losses.length; index++) {
          this.losses[index].Category = this.category[this.losses[index].CategoryCode - 1].CategoryDesc;
          this.losses[index].color = this.Colors[this.losses[index].LossColor - 1].color;
        }
      }
    });

    console.log(this.isHidden);
    this.isHidden = false;
    console.log(this.isHidden);
  }
}

