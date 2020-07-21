import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CourtService } from 'src/app/services/court.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';


declare var google;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {

  viewIcon = "map-outline";
  iconList = ["map-outline", "list-outline"];
  pathList = ["courtlist", "courtmap"];
  filtereditems: any;
  searchTerm: string;
  autocompleteService: any;
  sharedDataParent: string;
  geocoder: any;
  moscowLocation: any;

  constructor(private alertService: AlertService,
              private navCtrl: NavController,
              private courtService: CourtService,
              private router: Router) { 
                  this.filtereditems=[];
                  this.searchTerm = '';
                  this.moscowLocation = new google.maps.LatLng(55.7558, 37.6173)
                  this.geocoder = new google.maps.Geocoder();
                  this.autocompleteService = new google.maps.places.AutocompleteService();
              }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  changeView() {
    let nextNumb = (+(!(this.iconList.findIndex(el => el == this.viewIcon))))
    this.router.navigate(['/tabs/search/', this.pathList[nextNumb]])
    this.viewIcon = this.iconList[nextNumb]
  }
  suggestionChosen(sugText:string){
    this.searchTerm = sugText
    this.geocoder.geocode( { 'address': sugText}, (results, status) => {
      if (status == 'OK') {
        if (results.length >= 1){
          this.courtService.notifyOther({option: 'suggestion_chosen', data: {suggestion:sugText, lat:JSON.parse(JSON.stringify(results[0].geometry.location)).lat, lng:JSON.parse(JSON.stringify(results[0].geometry.location)).lng}});
        } else {
          this.alertService.presentToast("Такого адреса не существует.")
        }
      } else {
        this.alertService.presentToast("Something is off with API or request to it")
      }
    }) 
    this.searchCancel();
  }
  searchPushed(){
    this.suggestionChosen(this.searchTerm)
  }

  testymaps(){
    this.alertService.presentToast(this.router.url)
  }

  filterItems(){
    if (this.searchTerm.length < 1) return;
    var displaySuggestions = (predictions, status) => {
      if (status == 'OK') {
        this.filtereditems = predictions
      }
      else {
        this.alertService.presentToast("Something is off with API or request to it")
      }
    };
    this.autocompleteService.getQueryPredictions({input: this.searchTerm, location: this.moscowLocation, radius:25000}, displaySuggestions)
		// this.courtService.getSuggestions(this.searchTerm).then(
    //   data => {
    //     if (data['success']) {
    //       this.filtereditems = data['data']
    //     } else {
    //       this.alertService.presentToast(JSON.stringify(data['errors']))
    //     }
    //   }
    // ).catch (
    //   error => {
    //     this.alertService.presentToast(JSON.stringify(error))
    //   }
    // )
  }
  searchCancel() {
    this.filtereditems = [];
  }

  

}
