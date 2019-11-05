import { Component, OnInit, Input, resolveForwardRef } from '@angular/core';
import { LocalStorageService } from '../../Service/local-storage.service';
import { WebApiService } from '../../Service/web-api.service';
import { Find } from '../../Find';
import { City } from '../../City';


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
        // res.array.forEach(element => {
        //   this.ListCity.push({CityCode: element.CityCode ,CityTavCode: element.CityTavCode, CityName: element.CityName})
        // });
      }
    })
   
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

//   filterForeCasts(filterVal: any) {
//     if (filterVal == "0")
//         this.forecasts = this.cacheForecasts;
//     else
//     this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
// }

}