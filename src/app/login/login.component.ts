import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../models/requests.interface';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() userFound: any = new EventEmitter();
  formType: string = '';

  constructor(private store: StoreService) { }

  ngOnInit(): void {
  }

  login() {
    const email = (document.getElementById('loginEmail') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;
    if(this.store.userStore.length > 0) {
      let user = this.store.userStore.find(e => e.email === email && e.password === password);
      if(user) {
        window.localStorage.setItem('user', JSON.stringify(user));
        this.userFound.emit(true);
      } else {
        alert("User not found!");
      }
    }
  }

  signUp() {

  }

}
