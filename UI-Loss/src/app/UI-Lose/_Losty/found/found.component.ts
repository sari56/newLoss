import { Component, OnInit, Input } from '@angular/core';
import { WebApiService, Category } from '../../Service/web-api.service';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})

export class FoundComponent implements OnInit {
  @Input()
  found_hid: boolean = true;
  isHidden: boolean = true;
  constructor(private _WebApiService: WebApiService) { }
  ListCategory: Array<Category> = new Array<Category>();
  ngOnInit() {
    this._WebApiService.GetAllCategory().then(res => {
      if (res)
        this.ListCategory = res;
    })
    console.log(this.ListCategory.length);
  }

  Check(fid, pass) {
    //  if(this._WebApiService.CheckMatch_FindCode(fid,pass)==true)
    this.isHidden = false;
    console.log("Check");
    console.log(this.isHidden);
  }
}
