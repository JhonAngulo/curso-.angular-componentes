import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  authUser: User = {
    id: '',
    email: '',
    name: '',
    password: ''
  };
  token = '';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
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
