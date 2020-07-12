import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://af4d558afac0.ngrok.io/api/';
  constructor() { }
}
