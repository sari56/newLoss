import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-details',
  templateUrl: './find-details.component.html',
  styleUrls: ['./find-details.component.scss']
})
export class FindDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  CheckEmail(){
    window.alert('כתובת המייל נבדקת...');
    console.log('hello');
  }
}
