import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'custom-range-quantity-field',
  templateUrl: './custom-range-quantity-field.component.html',
  styleUrls: ['./custom-range-quantity-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomRangeQuantityFieldComponent {
  control = new FormControl(5);
}
