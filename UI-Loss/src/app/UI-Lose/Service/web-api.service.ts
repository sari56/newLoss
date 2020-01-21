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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private body: string
  private isValidate: number = 0;
  CityLocation: Array<CityLocation>;
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

  GetColors() {
    return this.setRequstData("Losty/", "GetColors", {});
  }

  InsertUser(params) {
    return this.setRequstData("Losty/", "InsertUser", params);
  }

  InsertFound(params) {
    return this.setRequstData("Losty/", "InsertFound", params);
  }

  InsertLoss(params) {
    return this.setRequstData("Losty/", "InsertLoss", params);
  }

  VerifyUserName(user: string[]) {
    return this.setRequstData("Losty/", "VerifyUserName", user);
  }

  GetFounds(params) {
    return this.setRequstData("Losty/", "GetFounds", params);
  }

  GetFoundsPersonalArea(params) {
    return this.setRequstData("Losty/", "GetFoundsPersonalArea", params);
  }

  GetLosesToPersonalArea(params) {
    return this.setRequstData("Losty/", "GetLosesToPersonalArea", params);
  }

  ChangeStatus(params) {
    return this.setRequstData("Losty/", "ChangeStatus", params);
  }

  SendEmail(params) {
    return this.setRequstData("Losty/", "SendEmail", params);
  }

  VerifyUserId(params) {
    return this.setRequstData("Losty/", "VerifyUserId", params);
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

export class Signs {
  Category: number;
  Description: string;
  Color: number;
  date: Date;
  Remarks: string;
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

export class Color {
  ColorCode: number;
  color: string;
}

export class Found {
  FoundCode: number;
  FindID: string;
  CategoryCode: number;
  Category: string;
  FoundDesc: string;
  FoundColor: number;
  color: string;
  FoundDate: Date;
  Found_X: number;
  Found_Y: number;
  Remarks: string;
  Status: string;
  StatusCode: number;
  // PictureCode:number;
  Date: Date;
}

export class Loss {
  LossCode: string;
  LoseID: string;
  CategoryCode: number;
  Category: string;
  LossDesc: string;
  LossColor: number;
  color: string;
  LossDate: Date;
  Loss_X: number;
  Loss_Y: number;
  Remarks: string;
  StatusCode: number;
  //  PictureCode:number;
  Date: Date;
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
  PersonID: string;
  PersonName: string;
  PersonCityCode: number;
  PersonAddress: string;
  PersonPhone: string;
  PersonEmail: string;
}

export class CityLocation {
  CityCode: number;
  lat: number;
  lng: number;
}

