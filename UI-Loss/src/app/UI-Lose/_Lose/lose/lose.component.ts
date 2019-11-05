import { Component, OnInit, Input } from '@angular/core';
import { Lose } from '../../Lose';
import { WebApiService } from '../../Service/web-api.service';
import { City } from '../../City';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.scss']
})

export class LoseComponent implements OnInit {
  lose: Lose;
  ListCity: Array<City> = new Array<City>();
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    this.lose=new Lose();
    this._WebApiService.GetAllCity().then(res=>{
      if(res)
        this.ListCity = res;
    })
  }

}
