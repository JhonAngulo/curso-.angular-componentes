import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model'
import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  myShoppingCart: Product[] = []
  total: number = 0
  products: Product[] = []
  showProductDetail= false
  productChosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    category: {
      id: '',
      name: ''
    },
    description: ''
  }
  limit = 10
  offset = 0

  today = new Date();
  date = new Date(2021,1,21)

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  ngOnInit(): void {
    this.loadMore()
    // this.productsService.getProductsByPage(this.limit, this.offset)
    // .subscribe(data => {
    //   this.products = data;
    //   this.offset += this.limit;
    // })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: [''],
      price: 1000,
      categoryId: 2
    }
    this.productsService.create(product)
    .subscribe(data => {
      console.log('Created', data)
    })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Editado producto'
    }
    const id = this.productChosen.id
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products.splice(productIndex, 1);
      this.toggleProductDetail()
    })
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }
}
