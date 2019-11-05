import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../Service/web-api.service';

@Component({
  selector: 'app-losty',
  templateUrl: './losty.component.html',
  styleUrls: ['./losty.component.scss']
})
export class LostyComponent implements OnInit {
  constructor(private _WebApiService: WebApiService) { }
 isHidden:boolean=true;
  ngOnInit() {
  }
  Check(fid,pass) {
  //  if(this._WebApiService.CheckMatch_LoseCode(fid,pass)==true)
      this.isHidden=false;
  }
}
