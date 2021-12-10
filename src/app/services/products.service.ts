import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { checkTime } from '../interceptor/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private endPointUrl = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(this.endPointUrl, {
      params
    })
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.endPointUrl, {
      params: { limit, offset },
      context: checkTime()
    })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    )
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.endPointUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError(() => new Error('Algo esta mal en el servidor')) 
        }
        if (error.status === 404) {
          return throwError(() => new Error('El producto no existe')) 
        }
        return throwError(() => new Error('Ups algo salio mal'))  
      })
    )
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(
      this.endPointUrl,
      dto
    );
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(
      `${this.endPointUrl}/${id}`,
      dto
    );
  }

  delete(id: string) {
    return this.http.delete<boolean>(
      `${this.endPointUrl}/${id}`
    );
  }
}
