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
  setRequstData(actionName: string, collection: any, isObservable = false, identityGuid = null): any {
    this.body = JSON.stringify(collection);
    return this.http
      .post(
        environment._Url + actionName,
        this.body,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .toPromise()
      .catch(error => {
        console.log(error);
      });
  }

  GetAllCategory() {
    return this.setRequstData("GetCategory", {});
  }

  GetAllCity() {
    return this.setRequstData("GetCity", {});
  }

  UpdateCity(params) {
    return this.setRequstData("UpdateCity", {});
  }

  GetColors() {
    return this.setRequstData("GetColors", {});
  }

  InsertUser(params) {
    return this.setRequstData("InsertUser", params);
  }

  InsertFound(params) {
    return this.setRequstData("InsertFound", params);
  }

  InsertLoss(params) {
    return this.setRequstData("InsertLoss", params);
  }

  VerifyUserName(user: string[]) {
    return this.setRequstData("VerifyUserName", user);
  }

  GetLosses() {
    return this.setRequstData("GetLosses", {});
  }

  GetFounds(params) {
    return this.setRequstData("GetFounds", params);
  }

  GetFoundsPersonalArea(params) {
    return this.setRequstData("GetFoundsPersonalArea", params);
  }

  GetLosesToPersonalArea(params) {
    return this.setRequstData("GetLosesToPersonalArea", params);
  }

  ChangeStatus(params) {
    return this.setRequstData("ChangeStatus", params);
  }

  SendEmail(params) {
    return this.setRequstData("SendEmail", params);
  }

  VerifyUserId(params) {
    return this.setRequstData("VerifyUserId", params);
  }

  GetUser(params) {
    return this.setRequstData("GetFind", params);
  }

  EditUser(params) {
    return this.setRequstData("EditUser", params);
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

export class City {
  CityCode: number;
  CityName: string;
  Lat: number;
  Lng: number;
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
  Remarks: string;
  Status: string;
  StatusCode: number;
  // PictureCode:number;
  Date: Date;
  FoundLat: number;
  FoundLng: number;
  FoundCityCode: number;
  FoundCity: string;
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
  Remarks: string;
  StatusCode: number;
  //  PictureCode:number;
  Date: Date;
  LossLat: number;
  LossLng: number;
  LossCityCode: number;
  LossCity: string;
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
  FindID: string;
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
  CityName: string;
  Lat: number;
  Lng: number;
}

