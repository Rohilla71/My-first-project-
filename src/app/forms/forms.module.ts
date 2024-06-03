import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { MatModule } from '../appModules/mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ElementsComponent } from './elements/elements.component';

@NgModule({
  declarations: [ElementsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsRoutingModule,
    MatModule,

  ]
})
export class FormsModule { }
