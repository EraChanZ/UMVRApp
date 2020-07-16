import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CourtService } from 'src/app/services/court.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  viewIcon = "map-outline";
  iconList = ["map-outline", "list-outline"];
  pathList = ["courtlist", "courtmap"]

  constructor(private courtService: CourtService,
              private alertService: AlertService,
              private navCtrl: NavController,
              private router: Router) { }

  ngOnInit() {

  }

  changeView() {
    let nextNumb = (+(!(this.iconList.findIndex(el => el == this.viewIcon))))
    this.router.navigate(['/tabs/search/', this.pathList[nextNumb]])
    this.viewIcon = this.iconList[nextNumb]
  }

  

}
