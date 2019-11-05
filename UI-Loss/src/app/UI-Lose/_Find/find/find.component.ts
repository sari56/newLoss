import { Component, OnInit, Input, resolveForwardRef } from '@angular/core';
import { LocalStorageService } from '../../Service/local-storage.service';
import { WebApiService, City } from '../../Service/web-api.service';
import { Find } from '../../Find';
// import { City } from '../../City';


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {
  @Input()
  find_hid:boolean=true;
  find: Find;
  pass:string;
  _cityName:string;
  cityCode:number;
  cityName:string="בני ברק";
  city:City;
//  cities = [ 
//    { code: 'א', c: [] },{ code: 'ב', c: [] },{ code: 'ג', c: [] },{ code: 'ד', c: [] },{ code: 'ה', c: [] },{ code: 'ו', c: [] },{ code: 'ז', c: [] },{ code: 'ח', c: [] },{ code: 'ט', c: [] },{ code: 'י', c: [] },{ code: 'כ', c: [] },
//    { code: 'ל', c: [] },{ code: 'מ', c: [] },{ code: 'נ', c: [] },{ code: 'ס', c: [] },{ code: 'ע', c: [] },{ code: 'פ', c: [] },{ code: 'צ', c: [] },{ code: 'ק', c: [] },{ code: 'ר', c: [] },{ code: 'ש', c: [] },{ code: 'ת', c: [] }
//    ];
   ListCity: Array<City> = new Array<City>();
 
  constructor(private _WebApiService: WebApiService) { }

  ngOnInit() {
    this.find=new Find();
    this._WebApiService.GetAllCity().then(res =>{
      if(res){
        this.ListCity = res;
      }
    })
    
    console.log(this._WebApiService.GetCityCode(this.cityName));
    console.log(this.ListCity.length);
  }

  CheckEmail(fid){
    window.alert("check")
    // מייל אוטומטי
    this.pass="sss";
    // this._LocalStorage.Password=fid;
    // +" "+this.pass;
    console.log(fid)
  }

  selected(){
    this.cityCode=this.city.CityCode;
  }

  SaveUser(f: Find, cityName: string){
      this._WebApiService.GetCityCode([{Value : cityName}]).then(res=>{
      if(res)
      f.FindCityCode=res;
    });
    this._WebApiService.InsetUser(f);
  }


//   filterForeCasts(filterVal: any) {
//     if (filterVal == "0")
//         this.forecasts = this.cacheForecasts;
//     else
//     this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
// }

}
