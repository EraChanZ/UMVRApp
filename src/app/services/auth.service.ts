import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { HTTP } from '@ionic-native/http/ngx'
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any = undefined;
  constructor(
    private http: HTTP,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }
  login(username: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/login',
      {username: username, password: password}, {}
    ).then(
      data => {
        let jsonResponse = JSON.parse(data.data)
        if (jsonResponse.hasOwnProperty("token")){
          this.storage.setItem('token', jsonResponse["token"])
          this.token = jsonResponse["token"];
          this.isLoggedIn = true;
          jsonResponse['success'] = true
          return jsonResponse;
        }
        else {
          return {"errors": JSON.stringify(jsonResponse), 'success':false}
        }
      },
    ).catch(
      error => {
        return {'errors': error, 'success':false}
      }
    );
  }
  register(first_name: String, last_name: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {username: email, first_name: first_name, last_name: last_name, email: email, password: password, password2: password}, {}
    ).then(
      data => {
        let responseJson = JSON.parse(data.data)
        return responseJson
      }
    ).catch (
      error => {
        return {"errors": error, "success": false}
      }
    )
  }
  logout() {
      this.storage.remove("token");
      this.isLoggedIn = false;
      delete this.token;
  }
  user() {
    //const headers = new HttpHeaders({
    //  'Authorization': "Token " + this.token["token"]
    //});
    return this.http.get(this.env.API_URL + 'auth/user/get_data/', {}, { "Authorization": "Token " + this.token })
    .then(
      data => {
        let responseJson = JSON.parse(data.data)
        if (responseJson.hasOwnProperty('detail')){
          return {'success':false, 'errors':responseJson}
        } else{
          return {'success':true, 'data': responseJson as User}
        }
      }
    ).catch(
      error => {
        return {'success':false, 'errors':error}
      }
    )
  }

  getToken() {
    const p = new Promise((res, rej) => {
      (this.token) ? res() : rej()
    })
    return p.then(() => {
      this.isLoggedIn=true;
    }).catch(() => {
      return this.storage.getItem('token').then(
        data => {
          this.token = data;
          if(this.token != null) {
            this.isLoggedIn=true;
          } else {
            this.isLoggedIn=false;
          }
        },
        error => {
          this.token = null;
          this.isLoggedIn=false;
        }
      )
    })
  }
}