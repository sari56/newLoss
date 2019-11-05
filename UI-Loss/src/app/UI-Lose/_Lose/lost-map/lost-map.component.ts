import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lost-map',
  templateUrl: './lost-map.component.html',
  styleUrls: ['./lost-map.component.scss']
})
export class LostMapComponent implements OnInit {
  @Input()
  map_hid: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
