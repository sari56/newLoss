import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/internal/Observable';
// import { City } from '../City';
import { environment } from 'src/environments/environment';
import { VirtualTimeScheduler } from 'rxjs';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';


@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private body: string
  private isValidate: number = 0;

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

  InsertLose(params) {
    return this.setRequstData("Losty/", "InsertLose", params);
  }

  VerifyUserName(user: string[]) {
    return this.setRequstData("Losty/", "VerifyUserName", user);
  }

  GetFounds(params) {
    return this.setRequstData("Losty/", "GetFounds", params);
  }

  ChangeStatus(params) {
    return this.setRequstData("Losty/", "ChangeStatus", params);
  }

  SendEmail(params) {
    return this.setRequstData("Losty/", "SendEmail", params);
  }

  CheckEmail(email: string) {
    if (!email.includes("@")) {
      this.isValidate = 1;
      window.alert("there is not '@'");
    }
    else {
      for (let i = 0; i <= email.length; i++) {
        if (email[i] == '@') {
          if (i > 0 && i < email.length - 1) {
            if (email[i - 1] == ' ') {
              this.isValidate = 1;
              window.alert("there is not char before @");
            }
            if (email[i + 1] == ' ') {
              this.isValidate = 1;
              window.alert("there is not char after @");
            }
            else {
              this.isValidate = 1;
              window.alert("the address isn't correct");
            }
          }
          else {
            if (email[i] == '.') {
              if (i > 0 && i < email.length) {
                if (email[i - 1] == ' ') {
                  this.isValidate = 1;
                  window.alert("ther is not char before .");
                }
                if (email[i + 1] == ' ') {
                  this.isValidate = 1;
                  window.alert("ther is not char after .");
                }
                else {
                  this.isValidate = 1;
                  window.alert("the address isn't correct");
                }
              }
            }
          }
        }
      }
    }
    if (this.isValidate == 0) {
      return 0;
    }
    return 1;
  }
}


export interface City {
  CityCode: number;
  CityTavCode: number;
  CityName: string;
}

export class Category {
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
  // PictureCode:number;
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

export class Find {
  FindID: number;
  FindName: string;
  FindCityCode: number;
  FindAddress: string;
  FindPhone: string;
  FindEmail: string;
}

export class Person {
  PersonID: number;
  PersonName: string;
  PersonCityCode: number;
  PersonAddress: string;
  PersonPhone: string;
  PersonEmail: string;
}


