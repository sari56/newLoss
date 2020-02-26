import { Component, OnInit, Input } from '@angular/core';
import { Found, Category, Color, WebApiService, Person, Find } from '../../Service/web-api.service';

@Component({
  selector: 'app-personal-found',
  templateUrl: './personal-found.component.html',
  styleUrls: ['./personal-found.component.scss']
})
export class PersonalFoundComponent implements OnInit {
  @Input()
  FOUNDS: Array<Found> = new Array();
  person: Person = new Person();
  find: Find = new Find();
  buttonHidden: boolean = false;
  result: string;

  // userID: string;
  // person: Person = new Person();
  // category: Array<Category> = new Array();
  // Colors: Array<Color> = new Array<Color>();


  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    // console.log(this.userID);
    // this._WebApiService.GetAllCategory().then(res => {
    //   if (res) {
    //     this.category = res;
    //   }
    // })

    // this._WebApiService.GetColors().then(res => {
    //   if (res)
    //     this.Colors = res;
    //   console.log(this.Colors.length);
    // })
    // this.person.PersonID = this.userID;
    // this._WebApiService.GetFoundsPersonalArea(this.person).then(res => {
    //   if (res) {
    //     this.founds = res;
    //     for (let index = 0; index < this.founds.length; index++) {
    //       this.founds[index].Category = this.category[this.founds[index].CategoryCode - 1].CategoryDesc;
    //       this.founds[index].color = this.Colors[this.founds[index].FoundColor - 1].color;
    //       console.log(this.founds[index].Category);
    //     }
    //   }
    // });
  }

  SelectFound(f: Found) {
    debugger;
    console.log(f.FoundCode);
    this.person.PersonID = f.FindID;
    f.StatusCode = 1004;
    // this._WebApiService.GetFind(this.person).then(res => {
    //   if (res) {
    //     this.find = res;
    //   }
    // })
    this._WebApiService.ChangeFoundStatus(f).then(res => {
      this.result = res;
    });
    this.buttonHidden = true;
  }

}
