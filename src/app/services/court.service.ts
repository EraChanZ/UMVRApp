import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HTTP } from '@ionic-native/http/ngx'
import { EnvService } from './env.service';
import { Court } from '../models/court';
import { Subject }    from 'rxjs';

/*
TEMPLATE
return this.authService.getToken().then( () => {
      if(this.authService.token == undefined) {
        return {'success':false, 'errors': 'token undefined' }
      }
      else{
        return this.http.get(this.env.API_URL + 'courts/court/suggestions?query=' + query, {}, { "Authorization": "Token " + this.authService.token }).then
          (data => {
            let responseJson = JSON.parse(data.data)
            if (responseJson.hasOwnProperty("error")){
              return {'success':false, 'errors': responseJson['error']}
            }
          }
          ).catch (
            error => {
              return {'success':false, 'errors': error}
            }
          )
      }
    });
*/
@Injectable({
  providedIn: 'root'
})
export class CourtService {
  constructor(private authService: AuthService,
              private http: HTTP,
              private env: EnvService,
              ) { }

  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
  getLocationOrderedCourts(query:string, type:string, offset:string, lat:string, lng:string){
    return this.authService.getToken().then( () => {
      if(this.authService.token == undefined) {
        return {'success':false, 'errors': 'token undefined' }
      }
      else{
        return this.http.get(this.env.API_URL + `courts/court/get_filtered_courts?query=${query}&type=${type}&offset=${offset}&lat=${lat}&lng=${lng}`, {}, { "Authorization": "Token " + this.authService.token }).then
          (data => {
            let responseJson = JSON.parse(data.data)
            if (responseJson.hasOwnProperty("error")){
              return {'success':false, 'errors': responseJson['error']}
            }
            else{
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
  getSuggestions(query:string) {
    return this.authService.getToken().then( () => {
      if(this.authService.token == undefined) {
        return {'success':false, 'errors': 'token undefined' }
      }
      else{
        return this.http.get(this.env.API_URL + 'courts/court/suggestions?query=' + query, {}, { "Authorization": "Token " + this.authService.token }).then
          (data => {
            let responseJson = JSON.parse(data.data)
            if (responseJson.hasOwnProperty("error")){
              return {'success':false, 'errors': responseJson['error']}
            }
            else  {
              return {'success':true, 'data': responseJson['suggestions']}
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
