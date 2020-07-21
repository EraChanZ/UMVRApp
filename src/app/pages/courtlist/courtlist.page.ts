import { Component, OnInit, OnDestroy, Query } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CourtService } from 'src/app/services/court.service';
import { EnvService } from 'src/app/services/env.service';
import { Court } from '../../models/court'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-courtlist',
  templateUrl: './courtlist.page.html',
  styleUrls: ['./courtlist.page.scss'],
})
export class CourtlistPage implements OnInit, OnDestroy {

  courtList: Array<Court>;
  lastFetching: Date;
  private subscription: Subscription;


  constructor(private alertService: AlertService,
              private courtService: CourtService,
              private envService: EnvService
              ) { }

  ngOnInit() {
    this.subscription = this.courtService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'suggestion_chosen') {
        this.courtService.getLocationOrderedCourts(res.data.suggestion, "location", "0", res.data.lat.toString(), res.data.lng.toString()).then(
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
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ionViewDidEnter() {
    if ( (!(this.lastFetching)) || (((new Date()).getTime() - this.lastFetching.getTime()) > 60000))  this.fetchCourts()
  }
  fetchCourts() {
    this.lastFetching = new Date()
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
