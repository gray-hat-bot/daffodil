import {
  Injectable,
  Inject,
} from '@angular/core';
import {
  Resolve,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  filter,
  map,
} from 'rxjs/operators';

import { DaffCart } from '@daffodil/cart';
import {
  DaffCartLoadSuccess,
  DaffCartActionTypes,
} from '@daffodil/cart/state';

import { DaffCartResolver } from './cart-resolver.service';
import { DaffEmptyCartResolverRedirectUrl } from './tokens/empty-cart-resolver-redirect.token';

/**
 * Resolves the cart before navigation. Redirects to a given url when a failure occurs during Cart Load.
 * This url is `/` by default but can be overridden with the DaffCartResolverRedirectUrl injection token.
 * This resolver also redirects to a different url when the cart is empty after successfully loading.
 * This url is also `/` by default, but can be overridden with the DaffEmptyCartResolverRedirectUrl
 */
@Injectable({
  providedIn: 'root',
})
export class DaffEmptyCartResolver implements Resolve<Observable<DaffCart>> {
  constructor(
    private cartResolver: DaffCartResolver,
    private router: Router,
    @Inject(DaffEmptyCartResolverRedirectUrl) private redirectUrl: string,
  ) {}

  resolve(): Observable<DaffCart> {
    return this.cartResolver.resolve().pipe(
      map((cart: DaffCart) => {
        if (cart.items.length === 0) {
          this.router.navigateByUrl(this.redirectUrl);
        }
        return cart;
      }),
    );
  }
}
