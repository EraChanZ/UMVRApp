import { Component, OnInit, ViewChild } from '@angular/core';
declare var google;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {

  @ViewChild("map") mapElement;
  map:any;
  constructor() { }

  ngOnInit() {
    this.initMap()
  }

  initMap(){
    let coords = new google.maps.LatLng(55.7558, 37.6173)
    let mapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
  }


}
