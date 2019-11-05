import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
// import { Observable } from 'rxjs';
import { Category } from '../Category';
// import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/internal/Observable';
import { City } from '../City';
import { environment } from 'src/environments/environment';
import { VirtualTimeScheduler } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private body: string


  constructor(private http: HttpClient) { }
  setRequstData( controllerName: string, actionName: string, collection: any, isObservable = false, identityGuid = null): any {
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

  GetAllCity() {
    return this.setRequstData("Losty/","GetCity", {});
  }

  GetAllCategory(){
    return this.setRequstData("Losty/","GetCategory",{});
  }
}



