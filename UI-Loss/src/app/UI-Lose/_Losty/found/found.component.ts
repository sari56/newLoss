import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})

export class FoundComponent implements OnInit {
  @Input()
  found_hid:boolean=true;
  isHidden:boolean=true;
  constructor() { }

  ngOnInit() {
  }

  Check(fid,pass) {
    //  if(this._WebApiService.CheckMatch_FindCode(fid,pass)==true)
        this.isHidden=false;
        console.log("Check");
        console.log(this.isHidden);
    }
}
