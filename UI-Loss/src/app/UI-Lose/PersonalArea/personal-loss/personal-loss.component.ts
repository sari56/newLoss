import { Component, OnInit, Input } from '@angular/core';
import { Person, Category, Color, Loss, WebApiService, Lose } from '../../Service/web-api.service';

@Component({
  selector: 'app-personal-loss',
  templateUrl: './personal-loss.component.html',
  styleUrls: ['./personal-loss.component.scss']
})
export class PersonalLossComponent implements OnInit {
  @Input()
  LOSSES: Array<Loss> = new Array();
  person: Person = new Person();
  lose: Lose = new Lose();
  buttonHidden: boolean = false;
  result: string;
  //id - output
  // person: Person;
  // category: Array<Category> = new Array();
  // Colors: Array<Color> = new Array<Color>();
  

  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    // this.person = new Person();
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

    // this._WebApiService.GetLosesToPersonalArea(this.person).then(res => {
    //   if (res) {
    //     this.losses = res;
    //     for (let index = 0; index < this.losses.length; index++) {
    //       this.losses[index].Category = this.category[this.losses[index].CategoryCode - 1].CategoryDesc;
    //       this.losses[index].color = this.Colors[this.losses[index].LossColor - 1].color;
    //     }
    //   }
    // });
  }

  SelectLoss(l: Loss) {
    console.log(l.LossCode);
    this.person.PersonID = l.LoseID;
    l.StatusCode = 2;
    // this._WebApiService.GetFind(this.person).then(res => {
    //   if (res) {
    //     this.find = res;
    //   }
    // })
    this._WebApiService.ChangeLossStatus(l).then(res => {
      this.result = res;
    });
    this.buttonHidden = true;
  }
}
