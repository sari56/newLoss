import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get Password(): string {
    return localStorage.getItem('Name + Password');
  }

  set Password(value: string) {
    localStorage.setItem('Name + Password', value);
  }
}
