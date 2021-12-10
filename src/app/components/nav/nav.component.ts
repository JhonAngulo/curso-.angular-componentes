import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user.model';

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

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu
  }

}
