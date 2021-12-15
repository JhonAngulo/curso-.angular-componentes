import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() authUser: User = {
    id: '',
    email: '',
    name: '',
    password: ''
  }

  activeMenu = false;
  counter = 0;
  limit = 10;
  offset = 0;
  categories: Category[] = []

  constructor(
    private storeService: StoreService,
    private categoriesService: CategoriesService
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

  getAllCategories() {
    this.categoriesService.getAll(this.limit, this.offset)
    .subscribe(rta => {
      this.categories = rta;
    })
  }

}
