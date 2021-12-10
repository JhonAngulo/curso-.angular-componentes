import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { User } from './models/user.model'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userParent = 'https://www.w3schools.com/howto/img_avatar.png';
  token = '';
  authUser: User = {
    id: '',
    email: '',
    name: '',
    password: ''
  }

  constructor (
    private authService: AuthService,
    private usersService: UsersService,
  ) {

  }

  onLoaded(img: string) {
    console.log('log padre', img)
  }

  createUser() {
    this.usersService.create({
      name: 'Jhon',
      email: 'jhon.a@correo.com',
      password: 'a123456789'
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }

  login() {
    this.authService.login({
      email: 'jhon.a@correo.com',
      password: 'a123456789'
    })
    .subscribe(rta => {
      console.log(rta.access_token);
      this.token = rta.access_token;
    })
  }

  getProfile() {
    this.authService.profile()
    .subscribe(data => {
      console.log(data)
      this.authUser = data
    })
  }
}
