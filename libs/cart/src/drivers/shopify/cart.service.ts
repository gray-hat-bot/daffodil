import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DaffDriverConfigService } from '@daffodil/driver';

import { Cart } from '../../models/cart';
import { DaffCartServiceInterface } from '../interfaces/cart-service.interface';

@Injectable({
  providedIn: 'root'
})
export class DaffShopifyCartService implements DaffCartServiceInterface {
  url = this.daffodilConfigService.config.BASE_URL + 'api/cart';

  constructor(
    private http: HttpClient,
    private daffodilConfigService: DaffDriverConfigService
  ) {}

  get(): Observable<Cart> {
    return this.http.get<Cart>(this.url);
  }

  addToCart(productId: string, qty: number): Observable<Cart> {
    return this.http.post<Cart>(this.url + '/addToCart', { productId, qty });
  }

  clear(): Observable<void> {
    return this.http.post<void>(this.url + '/clear', {});
  }
}