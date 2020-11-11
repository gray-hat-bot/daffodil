import gql from 'graphql-tag';

import { orderItemFragment } from './order-item';

export const orderShipmentItemFragment = gql`
  fragment orderShipmentItem on ShipmentItemInterface {
    __typename
    id
    quantity_shipped
    order_item {
      ...orderItem
    }
  }
  ${orderItemFragment}
`;