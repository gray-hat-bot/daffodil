import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DaffAuthStorageService } from '@daffodil/auth';
import {
  DaffCart,
  DaffCartAddress,
  DaffCartPaymentMethod,
} from '@daffodil/cart';
import { DaffMagentoCartPaymentService } from '@daffodil/cart/driver/magento';
import {
  DaffCartAddressFactory,
  DaffCartPaymentFactory,
} from '@daffodil/cart/testing';

import { DaffMagentoCartCustomerPaymentService } from './payment.service';

describe('@daffodil/cart-customer/driver/magento | DaffMagentoCartCustomerPaymentService', () => {
  let service: DaffMagentoCartCustomerPaymentService;
  let daffCartPaymentFactory: DaffCartPaymentFactory;
  let daffCartAddressFactory: DaffCartAddressFactory;

  let driverSpy: jasmine.SpyObj<DaffMagentoCartPaymentService>;
  let authStorageSpy: jasmine.SpyObj<DaffAuthStorageService>;

  let cartId: DaffCart['id'];
  let email: string;
  let mockDaffCartPaymentMethod: DaffCartPaymentMethod;
  let mockDaffCartAddress: DaffCartAddress;

  beforeEach(() => {
    driverSpy = jasmine.createSpyObj('DaffMagentoCartPaymentService', ['update', 'updateWithBilling']);
    authStorageSpy = jasmine.createSpyObj('DaffAuthStorageService', ['getAuthToken']);

    TestBed.configureTestingModule({
      providers: [
        DaffMagentoCartCustomerPaymentService,
        {
          provide: DaffMagentoCartPaymentService,
          useValue: driverSpy,
        },
        {
          provide: DaffAuthStorageService,
          useValue: authStorageSpy,
        },
      ],
    });

    service = TestBed.inject(DaffMagentoCartCustomerPaymentService);

    daffCartPaymentFactory = TestBed.inject(DaffCartPaymentFactory);
    daffCartAddressFactory = TestBed.inject(DaffCartAddressFactory);

    cartId = 'cartId';
    email = 'email';
    mockDaffCartPaymentMethod = daffCartPaymentFactory.create();
    mockDaffCartAddress = daffCartAddressFactory.create({
      email,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('update', () => {
    beforeEach(() => {
      driverSpy.update.and.returnValue(of(null));
    });

    describe('when the customer is logged in', () => {
      beforeEach(() => {
        authStorageSpy.getAuthToken.and.returnValue('token');
      });

      it('should remove the email from the address', done => {
        service.update(cartId, mockDaffCartPaymentMethod, mockDaffCartAddress).subscribe(() => {
          expect(driverSpy.update.calls.mostRecent().args[2].email).toBeUndefined();
          done();
        });
      });
    });
  });

  describe('updateWithBilling', () => {
    beforeEach(() => {
      driverSpy.updateWithBilling.and.returnValue(of(null));
    });

    describe('when the customer is logged in', () => {
      beforeEach(() => {
        authStorageSpy.getAuthToken.and.returnValue('token');
      });

      it('should remove the email from the address', done => {
        service.updateWithBilling(cartId, mockDaffCartPaymentMethod, mockDaffCartAddress).subscribe(() => {
          expect(driverSpy.updateWithBilling.calls.mostRecent().args[2].email).toBeUndefined();
          done();
        });
      });
    });
  });
});