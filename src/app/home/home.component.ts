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
    minZoom: 5,
    maxZoom: 18,
    center: latLng(46.879966, -121.726909)
  };

  // latLonList: any = [];

  layers: any[] = [];
  mapData: Help[] = [];

  mapCenter: any;
  mapToggle: boolean = false;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.store.postStore = HelpData;
    this.store.postSubject.subscribe(res => {
      this.mapData = res;
      console.log(this.mapData);
      this.getCurrentLocation();
      this.plotMap();
    });
    this.store.addPost(null);
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.mapCenter = new L.LatLng(location.coords.latitude, location.coords.longitude);
      this.store.userlocation = {
        lat: location.coords.latitude,
        lon: location.coords.longitude
      }

      let user:any = window.localStorage.getItem('user');

      if(user) {
        user = JSON.parse(user);
        if(user['postId'] == null) {
          this.placeUserMarker();
        }
      } else {
        this.placeUserMarker();
      }
    });
  }

  placeUserMarker() {
    this.layers.push(marker([this.store.userlocation.lat, this.store.userlocation.lon], {
      icon: icon({
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        iconUrl: "assets/help-marker.png"
      })
    }).bindPopup("You are here!", {minWidth : 200}).openPopup());
  }

  plotMap() {
    this.mapToggle = false;
    this.layers = [];
    this.mapData.forEach(e => {
      let location = e.location;
      const content = "<h2>"+e.title+"</h2><p>"+e.message+"</p>";
      this.layers.push(marker([location.lat, location.lon], {
        icon: icon({
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          iconUrl: "assets/user-marker.png"
        })
      }).bindPopup(content, {minWidth : 200}).openPopup());
      // this.latLonList.push([location.lat, location.lon])
    });
    this.mapToggle = true;
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
