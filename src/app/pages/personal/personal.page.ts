import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  user: User;
  constructor(private authService: AuthService,
              private navCtrl: NavController,
              private alertService: AlertService,
              ){}

  ngOnInit() {
  }
  logOut() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/landing');
  }
  ionViewWillEnter() {
    this.authService.user().then(
      user => {
        this.user = user;
      }
    ).catch(
      error => {
        this.alertService.presentToast(this.authService.token);
      }
    );
  }

}
