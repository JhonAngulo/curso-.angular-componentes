import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { User } from '../../../models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { AuthService } from '../../../services/auth.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  authUser: User | null = null;
  token: string = '';
  activeMenu = false;
  counter = 0;
  limit = 10;
  offset = 0;
  categories: Category[] = []

  constructor(
    private storeService: StoreService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
    this.getAllCategories()
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu
  }

  onLogin() {
    this.authService.login({
      email: 'jhon.a@correo.com',
      password: 'a123456789'
    })
    .subscribe(rta => {
      console.log(rta.access_token);
      this.token = rta.access_token;
      this.getProfile()
    })
  }

  onLogout() {
    this.authService.logout();
    this.authUser = null;
    this.router.navigate(['/home']);
  }

  getProfile() {
    this.authService.profile()
    .subscribe(data => {
      console.log(data)
      this.authUser = data
    })
  }

  getAllCategories() {
    this.categoriesService.getAll(this.limit, this.offset)
    .subscribe(rta => {
      this.categories = rta;
    })
  }

}
