import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TemplateModule } from '../../core/template/template.module';
import { IphoneModule } from '../../design/device/iphone/iphone.module';
import { DaffioHomeRoutingModule } from './home-routing.module';
import { DaffioHomeViewModule } from './view/home-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    TemplateModule,
    IphoneModule,

    DaffioHomeRoutingModule,
    DaffioHomeViewModule,
  ],
})
export class DaffioHomeModule { }
