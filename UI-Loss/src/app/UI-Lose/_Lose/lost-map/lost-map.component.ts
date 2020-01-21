import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Found, WebApiService, CityLocation } from '../../Service/web-api.service';
declare var google: any;



@Component({
  selector: 'app-lost-map',
  templateUrl: './lost-map.component.html',
  styleUrls: ['./lost-map.component.scss']
})
export class LostMapComponent implements OnInit {
  geocoder: any;
  @Input()
  map_hid: boolean = true;
public ListCity = [
  {
  name:'ירושלים',
  lat:31.771959,
  lng:35.217018,
  },
  {
    name:'רעננה',
    lat:32.184448,
    lng:34.870766,
    },
    {
     name:'אשדוד',
     lat:31.801447,
     lng:34.643497,
     },
     {
       name:'חיפה',
       lat:32.794044,
       lng:34.989571,
      }
];
  public location: Location = {
    selectedCity:{
       name:'',
       lat: 31.778860,
       lng: 35.203072,
      },
    zoom: 15,
    //ListLosty: new Array<Losty>()
    ListLosty:[] = [
      { name:'string',
      lat:31.778860,
      lng:35.203072,
      address:'string',
      icon:'//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      // icon: {
      //   path: 'M22 30 L42 30 L32 12 Z',
      //   fillColor: '#00CCBB',
      //   fillOpacity: 1,
      //   strokeColor: '',
      //   strokeWeight: 0
      // },
    }]

  };
 // @ViewChild(AgmMap) map: AgmMap;
 // neither @ViewChild(AgmMap) public map;
 @ViewChild('mapRef') mapElement: AgmMap;
 @ViewChild('map',{static: true}) public map: AgmMap;
  constructor(public mapsApiLoader: MapsAPILoader) {
    // debugger;
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }
  ngOnInit() {
  }


getLatlang() {
  // debugger;
  let address = 'פרי חדש 55 ירושלים ישראל';
  this.geocoder.geocode({ 'address': address }, (results) => {
    if (results[0]) {
      this.location.ListLosty[this.location.ListLosty.length] = {
        lat:results[0].geometry.location.lat(),
        lng:results[0].geometry.location.lng(),
        name:'צמיד',
        address: address,
        icon:'//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      }
      
      this.mapElement.triggerResize();
      // debugger;
      
      // this.clickPlace = {
      //   lat: event.coords.lat,
      //   lng: event.coords.lng,
      //   isOpen: true,
      //   address: results[0].formatted_address,
      //   shortAddress: results[0].formatted_address.replace("ישראל", ''),
      //   iscollectPoint: true,
      // }
    }
  });
}
}
interface City {
  name:string;
  lat:number;
  lng:number;
}
interface Losty {
  name:string;
  lat:number;
  lng:number;
  address:string;
  icon?:any;
}

interface Location {
  selectedCity:City;
   //viewport?: Object;
  zoom: number;
  ListLosty: Array<Losty>;
  // circles?: Array<Marker>;
  // triple?: Array<Marker>;
  // markers?: Array<Marker>;
  // waypoints?: Array<waypoint>;
  // markerOptions?: Array<Markop>;
  // academics?: Array<Marker>;
}