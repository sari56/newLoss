import { Injectable } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
public isLogin = false;
  private body: string
  ListCity: Array<City> = new Array();
  ListCategory: Array<Category> = new Array();
  ListColors: Array<Color> = new Array();
  constructor(private http: HttpClient) {
    // this.GetAllCity().then(res =>{
    //   this.ListCity = res;
    // })

    // this.GetAllCategory().then(res =>{
    //   this.ListCategory = res;
    // })

    // this.GetColors().then(res =>{
    //   this.ListColors = res;
    // })
   }
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

  GetFind(params) {
    return this.setRequstData("GetFind", params);
  }

  GetLose(params) {
    return this.setRequstData("GetLose", params);
  }

  GetUser(params) {
    return this.setRequstData("GetUser", params);
  }

  EditUser(params) {
    return this.setRequstData("EditUser", params);
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

  SearchLosses(params) {
    return this.setRequstData("SearchLosses", params);
  }

  GetFoundsPersonalArea(params) {
    return this.setRequstData("GetFoundsPersonalArea", params);
  }

  GetLosesToPersonalArea(params) {
    return this.setRequstData("GetLosesToPersonalArea", params);
  }

  ChangeFoundStatus(params) {
    return this.setRequstData("ChangeFoundStatus", params);
  }

  ChangeLossStatus(params) {
    return this.setRequstData("ChangeLossStatus", params);
  }

  SendEmailMessage(params) {
    return this.setRequstData("SendEmailMessage", params);
  }

  SendEmail(params) {
    return this.setRequstData("SendEmail", params);
  }

  VerifyUserId(params) {
    return this.setRequstData("VerifyUserId", params);
  }
}

export class Signs {
  Category: number;
  Description: string;
  Color: number;
  date: Date;
  Remarks: string;

  constructor(Category?: number, Description?: string, Color?: number, date?: Date, Remarks?: string) {
    this.Category = Category;
    this.Color = Color;
    this.date = date;
    if (Description != undefined)
      this.Description = Description;
    else
      this.Description = " ";

    if (Remarks != undefined)
      this.Remarks = Remarks;
    else {
      this.Remarks = " ";
    }
  }
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
  CategoryIcon: string;
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
  Status: string;
  StatusCode: number;
  Date: Date;
  LossLat: number;
  LossLng: number;
  LossCityCode: number;
  LossCity: string;
}

export class Lose {
  LoseID: string;
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

  constructor(FindID?: string, FindName?: string, FindCityCode?: number, FindAddress?: string, FindPhone?: string, FindEmail?: string) {
    this.FindID = FindID;
    this.FindName = FindName;
    this.FindCityCode = FindCityCode;
    this.FindAddress = FindAddress;
    this.FindPhone = FindPhone;
    this.FindEmail = FindEmail;
  }
}

export class Person {
  PersonID: string;
  PersonName: string;
  PersonCityCode: number;
  PersonAddress: string;
  PersonPhone: string;
  PersonEmail: string;

  constructor(PersonID?: string, PersonName?: string, PersonCityCode?: number, PersonAddress?: string, PersonPhone?: string, PersonEmail?: string) {
    this.PersonID = PersonID;
    this.PersonName = PersonName;
    this.PersonCityCode = PersonCityCode;
    this.PersonAddress = PersonAddress;
    this.PersonPhone = PersonPhone;
    this.PersonEmail = PersonEmail;
  }
}

export interface User {
  userName: string;
  personID: string;
}