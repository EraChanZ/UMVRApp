import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  user: User;
  constructor(private authService: AuthService,
              private navCtrl: NavController,
              ){}

  ngOnInit() {
  }
  logOut() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/landing');
  }
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }

}
