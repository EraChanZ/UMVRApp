import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HTTP } from '@ionic-native/http/ngx'
import { EnvService } from './env.service';
import { Court } from '../models/court';
@Injectable({
  providedIn: 'root'
})
export class CourtService {
  constructor(private authService: AuthService,
              private http: HTTP,
              private env: EnvService,
              ) { }
  getAllCourts(){
    return this.authService.getToken().then( () => {
      if(this.authService.token == undefined) {
        return {'success':false, 'errors': 'token undefined' }
      }
      else{
        return this.http.get(this.env.API_URL + 'courts/court/', {}, { "Authorization": "Token " + this.authService.token }).then
          (data => {
            let responseJson = JSON.parse(data.data)
            if (responseJson.hasOwnProperty('detail')){
              return {'success':false, 'errors': responseJson}
            }
            else {
              return {'success':true, 'data': responseJson as Array<Court>}
            }
          }
          ).catch (
            error => {
              return {'success':false, 'errors': error}
            }
          )
      }
    });
  }
  
}
