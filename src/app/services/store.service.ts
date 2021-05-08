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

  constructor() { }

  addPost(post: Help) {
    this.postStore.push(post);
    this.postSubject.next(this.postStore);
  }
}
