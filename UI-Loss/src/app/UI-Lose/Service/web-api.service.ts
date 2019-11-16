import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/internal/Observable';
// import { City } from '../City';
import { environment } from 'src/environments/environment';
import { VirtualTimeScheduler } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private body: string


  constructor(private http: HttpClient) { }
  setRequstData(controllerName: string, actionName: string, collection: any, isObservable = false, identityGuid = null): any {
    // const requestObj: any = { "InputParams": collection, "identityGuid": identityGuid };
    this.body = JSON.stringify(collection);
    return this.http
      .post(
        environment._Url + controllerName + actionName,
        this.body,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .toPromise()
      .catch(error => {
        console.log(error);
        // this.toastr.error(error.statusText, 'Error');
      });
  }

  GetAllCategory() {
    return this.setRequstData("Losty/", "GetCategory", {});
  }

  GetAllCity() {
    return this.setRequstData("Losty/", "GetCity", {});
  }

  // GetCityCode(params){
  //  return this.setRequstData("Losty/","GetCityCode",params);
  // }

  InsertUser(params) {
    return this.setRequstData("Losty/", "InsertUser", params);
  }

  InsertFound(params) {
    return this.setRequstData("Losty/", "InsertFound", params);
  }

  GetFounds(params) {
    return this.setRequstData("Losty/", "GetFounds", params);
  }


}

export interface City {
  CityCode: number;
  CityTavCode: number;
  CityName: string;
}

export class Category{
  CategoryCode: number;
  CategoryDesc: string;
}

export class Found {
  FoundCode: number;
  FindID: string;
  CategoryCode: number;
  FoundDesc: string;
  FoundColor: string;
  FoundDate: Date;
  Found_X: number;
  Found_Y: number;
  StatusCode: number;
  PictureCode:number;
  Date: Date;
}

export interface Loss {
  LossCode: string;
  LoseID: string;
  CategoryCode: number;
  LossColor: string;
  LossDate: Date;
  Loss_X: number;
  Loss_Y: number;
  StatusCode: number;
  //  PictureCode:number;
  Today: Date;
}

export class Lose {
  LoseID: number;
  LoseName: string;
  LoseCityCode: number;
  LoseAddress: string;
  LosePhone: string;
  LoseEmail: string;
  }

  export class Find{
    FindID: number;
    FindName: string;
    FindCityCode: number;
    FindAddress: string;
    FindPhone: string;
    FindEmail: string;
  }

  export class Person{
    PersonID: number;
    PersonName: string;
    PersonCityCode: number;
    PersonAddress: string;
    PersonPhone: string;
    PersonEmail: string;
  }


