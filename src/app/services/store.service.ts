import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Help, User } from '../models/requests.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  userStore: User[] = [
    {
      id: "01",
      name: "User",
      email: "user@test.com",
      password: "1234",
      postid: null
    }
  ];

  postStore: Help[] = [];

  postSubject = new Subject<Help[]>();

  selectedPostSubject = new Subject<Help>();

  userlocation: any;

  constructor() { }

  addPost(post: Help | null) {
    if(post) {
      this.postStore.push(post);
    }
    this.postSubject.next(this.postStore);
  }

  removePost(index: number) {
    this.postStore.splice(index, 1);
    this.postSubject.next(this.postStore);
  }

}
