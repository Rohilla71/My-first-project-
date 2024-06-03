import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MatModule } from '../appModules/mat.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitListService } from './unit-list.service';
import { CreateUnitListComponent } from './create-unit-list/create-unit-list.component';


@NgModule({
  declarations: [
    AnalyticsComponent, 
    ECommerceComponent,
    UnitListComponent,
    CreateUnitListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatModule
  ],
  providers: []
})
export class DashboardModule { }
