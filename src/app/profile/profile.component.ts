import { Component, OnInit } from '@angular/core';
import { Help, User } from '../models/requests.interface';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  formToggle: boolean = false;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    let user = window.localStorage.getItem('user');
    if(user) {
      this.user = JSON.parse(user);
    }
  }

  sendRequest(message: string) {
    let postId = this.store.postStore.length.toString();
    let help: Help = {
      id: postId,
      message: message,
      lastUpdated: new Date().toString(),
      created: new Date().toString(),
      location: this.store.userlocation
    }
    this.store.addPost(help);
    this.user.postId = postId;
    window.localStorage.setItem('user', JSON.stringify(this.user));
    this.formToggle = false;
  }

  removeRequest() {
    let postIndex = this.store.postStore.findIndex(e => e.id === this.user.postId);
    if(postIndex !== -1) {
      this.store.removePost(postIndex);
      this.user.postId = null;
      window.localStorage.setItem('user', JSON.stringify(this.user));
      this.checkIfLoggedIn();
    }
  }

}
