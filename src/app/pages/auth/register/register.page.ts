import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { error } from 'protractor';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }
  ngOnInit() {
  }
  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }
  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }
  register(form: NgForm) {
    this.authService.register(form.value.first_name, form.value.last_name, form.value.email, form.value.password).then(
      data => {
        if (data['success']){
          this.authService.login(form.value.email, form.value.password).then(
            data2 => { 
              if (data2['success']){
                this.alertService.presentToast("Успешно");
                this.dismissRegister();
                this.navCtrl.navigateRoot('/tabs');
              }
              else{
                this.alertService.presentToast(JSON.stringify(data2['errors']));
              }
            },
            ).catch(
              error2 => {
                console.log(error2);
                this.alertService.presentToast(JSON.stringify(error2));
              }
            );
        }
        else
        {
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