import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Court } from '../models/court';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }
  login(username: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/login',
      {username: username, password: password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }
  register(username: String, first_name: String, last_name: String, email: String, password: String, password2: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {username: username, first_name: first_name, last_name: last_name, email: email, password: password, password2: password2},
    ).pipe(
      tap(data => {
        console.log(data);
      })
      )
  }
  logout() {
      this.storage.remove("token");
      this.isLoggedIn = false;
      delete this.token;
  }
  user() {
    const headers = new HttpHeaders({
      'Authorization': "Token " + this.token["token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user/get_data/', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  getCourts(){
    const headers = new HttpHeaders({
      'Authorization': "Token " + this.token["token"]
    });
    return this.http.get<Array<Court>>(this.env.API_URL + 'courts/court/', { headers: headers }).pipe(
      tap(listofcourts => {
        return listofcourts;
      })
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