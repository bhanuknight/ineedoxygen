import { Component, Input, OnInit } from '@angular/core';
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
  userPost: any;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.checkIfLoggedIn();
    
    this.store.postSubject.subscribe(res => {
      this.userPost = this.checkForUserPost(res);
      console.log(this.userPost);
    });
  }

  checkForUserPost(postList: Array<any>) {
    let userPost;
    if(postList.length > 0 && this.user) {
      userPost = postList.find(e => e.id == this.user.postid);
      if(userPost) {
        return userPost;
      }
      return false;
    }
    return false;
  }

  checkIfLoggedIn() {
    let user = window.localStorage.getItem('user');
    if(user) {
      this.user = JSON.parse(user);
    }
  }

  sendRequest(data: any) {
    let postId = (this.store.postStore.length + 1).toString();
    let help: Help = {
      id: postId,
      title: data.form.controls.title.value,
      message: data.form.controls.message.value,
      lastUpdated: new Date().toString(),
      created: new Date().toString(),
      location: this.store.userlocation
    }
    this.user.postid = postId;
    window.localStorage.setItem('user', JSON.stringify(this.user));
    this.store.addPost(help);
    this.formToggle = false;
  }

  removeRequest() {
    let postIndex = this.store.postStore.findIndex(e => e.id === this.user.postid);
    if(postIndex !== -1) {
      this.store.removePost(postIndex);
      this.user.postId = null;
      window.localStorage.setItem('user', JSON.stringify(this.user));
      this.checkIfLoggedIn();
    }
  }

}
