import { ChangeDetectorRef, Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentPost: any;
  mobileToggle: boolean = false;

  constructor(
    private store: StoreService,
    private route: ActivatedRoute,
    private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkIfLoggedIn();
      // console.log(this.userPost);

    // this.store.selectedPostSubject.subscribe(res => {
    //   this.currentPost = res;
    //   this.changeDetectionRef.detectChanges();
    //   console.log(res);
    // })

    // this.route.queryParamMap.subscribe( params => {
    //   const id = params.get('postId');
    //   this.currentPost = this.findPostById(id);
    //   console.log(this.currentPost);  
    // });
  }

  // closeSelectedPost() {
  //   this.currentPost = null;
  //   this.changeDetectionRef.detectChanges();
  // }

  // findPostById(id: string | null) {
  //   if(id) {
  //     return this.store.postStore.find(e => e.id === id);
  //   }
  //   return;
  // }

  checkForUserPost() {
    let userPost;
    let postList = this.store.postStore;
    if(postList.length > 0 && this.user) {
      userPost = postList.find(e => e.id == this.user.postid);
      if(userPost) {
        return userPost;
      }
      return null;
    }
    return null;
  }

  checkIfLoggedIn() {
    let user = window.localStorage.getItem('user');
    if(user) {
      this.user = JSON.parse(user);
      this.userPost = this.checkForUserPost();
    } else {
      this.user = null;
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
      location: this.store.userlocation,
      comments: []
    }
    this.user.postid = postId;
    window.localStorage.setItem('user', JSON.stringify(this.user));
    this.store.addPost(help);
    this.userPost = this.checkForUserPost();
    this.formToggle = false;
  }

  removeRequest() {
    let postIndex = this.store.postStore.findIndex(e => e.id === this.user.postid);
    if(postIndex !== -1) {
      this.store.removePost(postIndex);
      this.user.postid = null;
      window.localStorage.setItem('user', JSON.stringify(this.user));
      this.userPost = this.checkForUserPost();
    }
  }

  logout() {
    // this.store.postSubject.unsubscribe();
    window.localStorage.removeItem('user');
    window.location.reload();
  }

  toggleForMobile() {
    this.mobileToggle = !this.mobileToggle;
  }

}
