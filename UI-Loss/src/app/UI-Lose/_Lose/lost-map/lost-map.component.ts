import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Found, City, WebApiService } from '../../Service/web-api.service';
declare var google: any;



@Component({
  selector: 'app-lost-map',
  templateUrl: './lost-map.component.html',
  styleUrls: ['./lost-map.component.scss']
})
export class LostMapComponent implements OnInit {
  @Input()
  map_hid: boolean = true;

  personID: string;
  selectedCity: string;
  cityCode: number;
  ListCity: Array<City> = new Array<City>();

  public clickPlace: ClickPlace = { isOpen: false };

  @Input() isNormal: boolean;
  @Input() set center(value: any) {
    if (value) {
      this.location.lat = Number(value.lat);
      this.location.lng = Number(value.lng);
    }
  }

  dir = {
    origin: { lat: 0, lng: 0 },
    destination: { lat: 0, lng: 0 },
  };
  // @Input() set studentscollectPoint(value: StudentsSearch[]) {
  //   // debugger;
  //   if (value) {
  //     this.findLocations(value, 'triple');
  //   }
  // }
  // @Input() set studentsInRoute(value: StudentsSearch[]) {
  //   // debugger;
  //   if (value) {
  //     this.findLocations(value, 'markers');
  //   }
  // }
  // @Input() set studentsLocation(value: StudentsSearch[]) {
  //   // debugger;
  //   if (value) {
  //     this.findLocations(value, 'circles');
  //   }
  // }

  public renderOptions = {
    suppressMarkers: true,
    polylineOptions: { strokeColor: '#f0f' }
  };
  @Output() createCollectPoint = new EventEmitter();
  @Output() addStudentsToRoute = new EventEmitter();
  academicsId: Array<any> = [];
  geocoder: any;
  circleRadius: number = 15;
  public location: Location = {
    lat: 31.778860,
    lng: 35.203072,
    markers: [],
    circles: [],
    triple: [],
    waypoints: [],
    markerOptions: [],
    academics: [],
    zoom: 15
  };


  @ViewChild(AgmMap) map: AgmMap;
  constructor(public mapsApiLoader: MapsAPILoader,private _WebApiService: WebApiService) {
    // debugger;
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.selectedCity = null;
    this._WebApiService.GetAllCity().then(res => {
      if (res) {
        this.ListCity = res;
      }
    })
    console.log(this.ListCity.length);
   }

  onChange($event) {
    console.log(this.selectedCity);
    let i;
    for (i = 1; i < this.ListCity.length && this.ListCity[i].CityName != this.selectedCity; i++);
    this.cityCode = this.ListCity[i].CityCode;
  }
  // findLocations(students, mark) {
  //   debugger;
  //   this.location[mark] = [];
  //   if (mark == 'circles') {
  //     this.academicsId = [];
  //   }
  //   else if (mark == 'triple') {
  //     this.location.triple = [];
  //   }
  //   else {
  //     this.dir = {
  //       origin: { lat: 0, lng: 0 },
  //       destination: { lat: 0, lng: 0 },
  //     };
  //     // this.dir = {origin:'',destination:''};
  //     this.location.waypoints = [];
  //     this.location.markerOptions = [];
  //   }
  //   if (mark == 'markers' && students.length < 2) {
  //     this.map.triggerResize();
  //   }
  //   else {
  //     students.forEach((element: StudentsSearch, index) => {
  //       debugger;
  //       if (mark == 'triple') {
  //         this.location['triple'].push({
  //           lat: Number(element.lat),
  //           lng: Number(element.lng),
  //           isOpen: false,
  //           isStudent: true,
  //           student: element,
  //           iconUrl: {
  //             path: 'M22 30 L42 30 L32 12 Z',
  //             fillColor: element.academic ? element.academic.color : '',
  //             fillOpacity: 1,
  //             strokeColor: '',
  //             strokeWeight: 2,
  //             scale: 1,
  //             labelOrigin: { x: 29, y: 23 },
  //           },
  //           label: {
  //             text: '' + element.collectPoint,
  //             color: "black",
  //             fontSize: "12px",
  //             fontWeight: "bold"
  //           },
  //         });
  //       }
  //       else if (mark == 'circles') {
  //         this.location['circles'].push({
  //           lat: Number(element.lat),
  //           lng: Number(element.lng),
  //           isOpen: false,
  //           isStudent: true,
  //           student: element,
  //           iconUrl: {
  //             path: 'M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M256,446.7',
  //             fillColor: element.academic ? element.academic.color : '',
  //             fillOpacity: 1,
  //             strokeColor: '',
  //             strokeWeight: 2,
  //             scale: 0.03,
  //             //  labelOrigin : {x:element.collectPoint > 9 ? -9: -5, y:-27},
  //           }
  //         });
  //         if (element.academic && !this.academicsId.find(item => item == element.academic.id)) {
  //           this.academicsId.push(element.academic.id);
  //           this.location['circles'].push({
  //             lat: Number(element.academic.lat),
  //             lng: Number(element.academic.lng),
  //             isOpen: false,
  //             student: element,
  //             isStudent: false,
  //             iconUrl: {
  //               path: 'M12 32 L12 56 L32 56 L52 56 L52 32 L32 8 Z',
  //               fillColor: element.academic ? element.academic.color : '',
  //               fillOpacity: 1,
  //               strokeColor: '#000',
  //               strokeWeight: 2,
  //               scale: 0.5,
  //             }
  //           });
  //         }
  //       }
  //       else if (mark == 'markers') {
  //         let idx = index + 1;
  //         let icon = {
  //           path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
  //           fillColor: element.iscollectPoint ? 'yellow' : element.isStudent ? element.academic.color : element.color,
  //           fillOpacity: 0.8,
  //           strokeColor: '#000',
  //           strokeWeight: 2,
  //           scale: 1,
  //           labelOrigin: { x: idx > 9 ? -9 : -5, y: -27 },
  //         };

  //         let wayPoint = {
  //           label: {
  //             text: '' + idx,
  //             color: "black",
  //             fontSize: "14px",
  //             fontWeight: "bold"
  //           },
  //           icon: icon,
  //           lat: Number(element.lat),
  //           lng: Number(element.lng),
  //           element: element,
  //         }
  //         this.location.markerOptions.push(wayPoint);
  //         index > 0 && index < students.length - 1 ? this.location.waypoints.push({ location: { lat: Number(element.lat), lng: Number(element.lng) } }) : index == 0 ? this.dir.origin = { lat: Number(element.lat), lng: Number(element.lng) } : this.dir.destination = { lat: Number(element.lat), lng: Number(element.lng) };

  //         // index > 0 && index < students.length-1 ? this.location.waypoints.push({location: element.address}):index == 0 ? this.dir.origin = element.address: this.dir.destination = element.address;
  //       }
  //     });
  //     this.map.triggerResize();

  //   }
  // }
  // addToRoute(id) {
  //   debugger;
  //   this.addStudentsToRoute.emit(id);
  // }
  // mapClick(event) {
  //   debugger;
  //   let latlng = { lat: event.coords.lat, lng: event.coords.lng };
  //   this.geocoder.geocode({ 'location': latlng }, (results) => {
  //     if (results[0]) {
  //       this.clickPlace = {
  //         lat: event.coords.lat,
  //         lng: event.coords.lng,
  //         isOpen: true,
  //         address: results[0].formatted_address,
  //         shortAddress: results[0].formatted_address.replace("ישראל", ''),
  //         iscollectPoint: true,
  //       }
  //     }
  //   });
  // }
  // directionStatus(status) {
  //   debugger;
  //   if (status == "ZERO_RESULTS")
  //     alert('אין תוצאות במפה למסלול המבוקש')
  // }
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
