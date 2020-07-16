import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CourtService } from 'src/app/services/court.service';
import { EnvService } from 'src/app/services/env.service';
import { Court } from '../../models/court'

@Component({
  selector: 'app-courtlist',
  templateUrl: './courtlist.page.html',
  styleUrls: ['./courtlist.page.scss'],
})
export class CourtlistPage implements OnInit {

  courtList: Array<Court>;

  constructor(private alertService: AlertService,
              private courtService: CourtService,
              private envService: EnvService
              ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.courtService.getAllCourts().then(
      data => {
        if (data['success']){
          this.courtList = data['data']
        } else {
          this.alertService.presentToast(JSON.stringify(data['errors']))
        }
      }
    ).catch(
      error => {
        this.alertService.presentToast(JSON.stringify(error))
      }
    )
  }

}
