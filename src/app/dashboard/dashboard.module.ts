import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MatModule } from '../appModules/mat.module';
import { StepperOverviewExample } from './project-stepper/project-stepper.component';


@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AnalyticsComponent, 
    ECommerceComponent,
    StepperOverviewExample
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatModule
  ]
})
export class DashboardModule { }
