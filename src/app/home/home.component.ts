import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { Help } from '../models/requests.interface';
import { HelpData } from './datastore';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';

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
    maxZoom: 13,
    center: latLng(46.879966, -121.726909)
  };

  // latLonList: any = [];

  layers: any[] = [];
  mapData: Help[] = [];

  mapCenter: any;
  mapToggle: boolean = false;

  constructor(private store: StoreService, private router: Router) { }

  ngOnInit(): void {
    this.store.postStore = HelpData;
    this.store.postSubject.subscribe(res => {
      this.mapData = res;
      console.log(this.mapData);
      this.getCurrentLocation();
      this.plotMap();
    });
    this.store.addPost(null);
    // setInterval(() => {
    //   console.log(this.selectedPost)
    // }, 5000)
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.mapCenter = new L.LatLng(location.coords.latitude, location.coords.longitude);
      this.store.userlocation = {
        lat: location.coords.latitude,
        lon: location.coords.longitude
      }

      // let user:any = window.localStorage.getItem('user');

      // if(user) {
      //   user = JSON.parse(user);
      //   if(user['postid'] == null) {
      //     this.placeUserMarker();
      //   }
      // } else {
        this.placeUserMarker();
      // }
    });
  }

  placeUserMarker() {
    this.layers.push(marker([this.store.userlocation.lat, this.store.userlocation.lon], {
      icon: icon({
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        iconUrl: "assets/help-marker.png"
      })
    }).bindPopup("You are here!").openPopup());
  }

  plotMap() {
    this.mapToggle = false;
    this.layers = [];
    this.mapData.forEach(e => {
      let location = e.location;
      const content = "<h2>"+e.title+"</h2><p>"+e.message+"</p><br>"+
      "<input type='text' name='comment' id='comment-input' placeholder='Write your message here.' "+
      "style='outline: none;padding: 5px;width: 90%;border-radius: 3px;'>"+
      "<button id='reach-btn' style='padding: 5px;background: #ff3b3f; color: white;border: none;margin-top: 5px;cursor: pointer;border-radius: 3px;'>Reach out</button>";
      this.layers.push(marker([location.lat, location.lon], {
        icon: icon({
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          iconUrl: "assets/user-marker.png"
        })
      }).bindPopup(content, {minWidth : 300}).openPopup().on('popupopen', this.sendSelectedPost.bind(this,e)));
      // this.latLonList.push([location.lat, location.lon])
    });
    this.mapToggle = true;
  }

  sendSelectedPost(post: Help) {
    // this.store.selectedPostSubject.next(post);

    const input = L.DomUtil.get('comment-input') as HTMLInputElement;

    const btn = L.DomUtil.get('reach-btn') as HTMLElement;

    L.DomEvent.on(btn, 'click', () => {
      const comment = input.value;
      if(comment) {
        const index = this.store.postStore.findIndex(e => e.id == post.id);
        if(index !== -1) {
          let loggedinUser: any = window.localStorage.getItem('user');
          if(loggedinUser) {
            loggedinUser = JSON.parse(loggedinUser);
            const commentObj = {
              user: loggedinUser.id,
              name: loggedinUser.name,
              comment: comment
            }
            const matchedComment = this.store.postStore[index].comments?.find(e => e.user == loggedinUser.id);
            if(!matchedComment) {
              this.store.postStore[index].comments?.push(commentObj);
              console.log(this.store.postStore[index]);
            }
          } else {
            alert("Please login first!");
          }
        }
      }
    });

    // this.router.navigate([''], {queryParams: {postId: post.id}});

    // const url = '/home?postId=' + post.id;
    // this.router.navigateByUrl(url);
    // window.location.href = url;
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
