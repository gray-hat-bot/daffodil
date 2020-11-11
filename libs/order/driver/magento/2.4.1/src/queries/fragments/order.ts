import gql from 'graphql-tag';

import { orderItemFragment } from './order-item';
import { orderAddressFragment } from './order-address';
import { orderShipmentFragment } from './order-shipment';
import { orderPaymentFragment } from './order-payment';
import { orderInvoiceFragment } from './order-invoice';
import { orderCreditFragment } from './order-credit';
import { orderTotalFragment } from './order-total';

export const orderFragment = gql`
  fragment order on GraycoreGuestOrder {
    __typename
    id
    order_date
    status
    carrier
    number
    shipping_method
    items {
      ...orderItem
    }
    billing_address {
      ...orderAddress
    }
    shipping_address {
      ...orderAddress
    }
    shipments {
      ...orderShipment
    }
    payment_methods {
      ...orderPayment
    }
    invoices {
      ...orderInvoice
    }
    credit_memos {
      ...orderCredit
    }
    total {
      ...orderTotal
    }
  }
  ${orderItemFragment}
  ${orderShipmentFragment}
  ${orderPaymentFragment}
  ${orderInvoiceFragment}
  ${orderCreditFragment}
  ${orderAddressFragment}
  ${orderTotalFragment}
`;