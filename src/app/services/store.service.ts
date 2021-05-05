import { Injectable } from '@angular/core';
import { User } from '../models/requests.interface';

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

  constructor() { }
}
