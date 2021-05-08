import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { Help } from '../models/requests.interface';
import { HelpData } from './datastore';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OpenStreetMap' })
    ],
    zoom: 13,
    center: latLng(46.879966, -121.726909)
  };

  // latLonList: any = [];

  layers: any[] = [];
  mapData: Help[] = [];

  mapCenter: any;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.setDataInStore();
    this.store.postSubject.subscribe(res => {
      this.mapData = res;
      this.getCurrentLocation();
      this.plotMap();
    });
  }

  setDataInStore() {
    this.store.postStore = HelpData;
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.mapCenter = new L.LatLng(location.coords.latitude, location.coords.longitude);
    });
  }

  plotMap() {
    this.mapData.forEach(e => {
      let location = e.location;
      this.layers.push(marker([location.lat, location.lon])
      .bindPopup(e.message));
      // this.latLonList.push([location.lat, location.lon])
    })
  }

  // getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = this.deg2rad(lat2 - lat1);  // this.deg2rad below
  //   var dLon = this.deg2rad(lon2 - lon1);
  //   var a =
  //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //       Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
  //       Math.sin(dLon / 2) * Math.sin(dLon / 2)
  //       ;
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c; // Distance in km
  //   return d;
  // }

  // deg2rad(deg: number) {
  //     return deg * (Math.PI / 180)
  // }

}
