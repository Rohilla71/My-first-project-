import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { MatModule } from '../appModules/mat.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitListService } from './unit-list.service';


@NgModule({
  declarations: [
    UnitListComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatModule
  ],
  providers: [
    UnitListService
  ]
})
export class ComponentsModule { }
