import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Court } from 'src/app/models/court';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  courts: Array<Court>
  courtsString: string
  constructor(private authService: AuthService,) { }

  ngOnInit() {
  }

  test(){
    console.log('test')
  }

  ionViewWillEnter() {
    this.authService.getCourts().catch(
      arrayofcourts => {
        this.courts = arrayofcourts;
        this.courtsString = JSON.stringify(this.courts);
        console.log(this.courts)
      }
    );
  }

}
