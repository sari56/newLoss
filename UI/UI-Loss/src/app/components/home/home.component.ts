import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  AddFound() {
    this._router.navigateByUrl('/found');
  }

  AddLoss() {
    this._router.navigateByUrl('/loss');
  }

  Search() {
    this._router.navigateByUrl('/search');
  }

  ShowMap() {
    this._router.navigateByUrl('/map');
  }
}
