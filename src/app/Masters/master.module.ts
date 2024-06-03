import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../appModules/mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { ClientListComponent } from './Client/client-list/client-list.component';
import { ClientCreateComponent } from './Client/client-create/client-create.component';
import { MastersRoutingModule } from './masters-routing.module';
import { CountryListComponent } from './Country/country-list/country-list.component';
import { CountryCreateComponent } from './Country/country-create/country-create.component';
import { StateListComponent } from './State/state-list/state-list.component';
import { StateCreateComponent } from './State/state-create/state-create.component';
import { CityCreateComponent } from './City/city-create/city-create.component';
import { CityListComponent } from './City/city-list/city-list.component';
import { DeliveryStatusListComponent } from './Delivery Status/delivery-status-list/delivery-status-list.component';
import { DeliveryStatusCreateComponent } from './Delivery Status/delivery-status-create/delivery-status-create.component';
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { CreateCustomerService } from './Customer/create-customer.service';
import { CustomerListComponent } from './Customer/customer-list/customer-list.component';
import { LandingPageComponent } from './Customer/landing-page/landing-page.component';
import { OtherDetailsTabComponent } from './Customer/other-details-tab/other-details-tab.component';
import { ClientDocumentComponent } from './Customer/client-document/client-document.component';
import { DocumentsUploadComponent } from './Customer/documents-upload/documents-upload.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientCreateComponent,
    CountryListComponent,
    CountryCreateComponent,
    StateListComponent,
    StateCreateComponent,
    CityCreateComponent,
    CityListComponent,
    DeliveryStatusListComponent,
    DeliveryStatusCreateComponent,
    CreateCustomerComponent,
    CustomerListComponent,
    LandingPageComponent,
    OtherDetailsTabComponent,
    ClientDocumentComponent,
    DocumentsUploadComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    ReactiveFormsModule,
    FormsRoutingModule,
    MatModule
  ],
  providers: [CreateCustomerService]
})
export class MasterModule {}
