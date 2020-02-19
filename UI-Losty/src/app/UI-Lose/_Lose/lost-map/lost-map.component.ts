import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
// import { MapsAPILoader, AgmMap } from '@agm/core';
import { Found, City, WebApiService, CityLocation } from '../../Service/web-api.service';
import { AgmMap, MapsAPILoader } from '@agm/core';
declare var google: any;



@Component({
  selector: 'app-lost-map',
  templateUrl: './lost-map.component.html',
  styleUrls: ['./lost-map.component.scss']
})
export class LostMapComponent implements OnInit {

  ListCity: Array<City> = new Array<City>();
  
  geocoder: any;
  // @ViewChild(AgmMap) map: AgmMap;
  selectedCity:{
    name:'',
    lat: 31.778860,
    lng: 35.203072,
   }
   
  constructor(public mapsApiLoader: MapsAPILoader,private _WebApiService: WebApiService) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ListLosty:[{}] = [
    { name:'string',
    lat:31.778860,
    lng:35.203072,
    address:'string',
    icon: {
      path: 'M22 30 L42 30 L32 12 Z',
      fillColor: '#00CCBB',
      fillOpacity: 1,
      strokeColor: '',
      strokeWeight: 0
    },}]

  ngOnInit() {
    
    this._WebApiService.GetAllCity().then(res => {
      if (res) {
        this.ListCity = res;
      }
    })
   }



}

interface Markop {
  label?: any;
  icon?: any;
  lat: number,
  lng: number,
  element: any,
}

interface Marker {
  lat?: number;
  lng?: number;
  label?: any;
  id?: number;
  isOpen?: boolean;
  isFound?: boolean;
  found?: Found;
  address?: string;
  iconUrl?: any;
}

interface waypoint {
  location?: any;
  color?: string;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  circles?: Array<Marker>;
  triple?: Array<Marker>;
  markers?: Array<Marker>;
  waypoints?: Array<waypoint>;
  markerOptions?: Array<Markop>;
  academics?: Array<Marker>;
}

interface ClickPlace {
  lat?: number;
  lng?: number;
  address?: string;
  shortAddress?: string;
  isOpen?: boolean;
  iscollectPoint?: boolean;
 }
