import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }
  ngOnInit() {
  }
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }
  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }
  login(form: NgForm) {
    this.authService.login(form.value.username, form.value.password).then(
      data => {
        if (data['success']){
          this.alertService.presentToast("Успешный вход!");
          this.dismissLogin();
          this.navCtrl.navigateRoot('/tabs');
        }
        else{
          this.alertService.presentToast(JSON.stringify(data['errors']));
        }
      },
    ).catch(
      error => {
        this.alertService.presentToast(JSON.stringify(error));
      }
    );
    
  }
}