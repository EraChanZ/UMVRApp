import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Court } from '../models/court';
import { HTTP } from '@ionic-native/http/ngx'
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  constructor(
    private http: HTTP,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }
  login(username: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/login',
      {username: username, password: password}, {}
    ).then(
      token => {
        let normToken = JSON.parse(token.data)['token']
        this.storage.setItem('token', normToken)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => {
            console.error('Error storing item', error)
            return error;
          }
        );
        this.token = normToken;
        this.isLoggedIn = true;
        return normToken;
      },
    );
  }
  register(first_name: String, last_name: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {username: email, first_name: first_name, last_name: last_name, email: email, password: password, password2: password}, {}
    ).then(
      data => {
        return JSON.parse(data.data)
      }
    ).catch (
      error => {
        return error
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
      user => {
        return JSON.parse(user.data) as User;
      }
    )
  }
  getCourts(){
    //const headers = new HttpHeaders({
    //  'Authorization': "Token " + this.token["token"]
    //});
    return this.http.get(this.env.API_URL + 'courts/court/', {}, { "Authorization": "Token " + this.token }).then
      (listofcourts => {
        return JSON.parse(listofcourts.data) as Array<Court>;
      }
    ).catch (
      error => {
        return error;
      }
    )
  }

  getToken() {
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
    );
  }
}