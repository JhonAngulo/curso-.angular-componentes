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
    this.authService.user$
    .subscribe(data => {
      this.authUser = data
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu
  }

  userAdmin = {
    email: 'admin@mail.com',
    password: 'admin123'
  }

  userBasic = {
    email: 'john@mail.com',
    password: 'changeme'
  }

  onLogin() {
    this.authService.login(this.userBasic)
    .subscribe(() => {
      this.getProfile()
      this.router.navigate(['/profile'])
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
