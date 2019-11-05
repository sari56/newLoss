import { Component, OnInit, Input } from '@angular/core';
import { Lose } from '../../Lose';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.scss']
})

export class LoseComponent implements OnInit {
  lose: Lose;
  constructor() { }

  ngOnInit() {
    this.lose=new Lose();
  }

}
