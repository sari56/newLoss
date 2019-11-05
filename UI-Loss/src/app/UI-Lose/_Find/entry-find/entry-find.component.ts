import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entry-find',
  templateUrl: './entry-find.component.html',
  styleUrls: ['./entry-find.component.scss']
})
export class EntryFindComponent implements OnInit {
  FindHidden: boolean = true;
  LostyHidden: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  ChangeFind() {
    
      // if (this.FindHidden == true){
        this.LostyHidden=true;
        this.FindHidden = false;
      // }  
      // else
      //   this.FindHidden = true;
    }
  

  ChangeLosty() {
      // if (this.LostyHidden == true){
        this.FindHidden=true;
        this.LostyHidden = false;
      // }
      // else
      //   this.LostyHidden = true;
    }
  }

