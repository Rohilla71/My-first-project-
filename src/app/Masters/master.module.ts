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
import { PostalCodeListComponent } from './Postal Code/postal-code-list/postal-code-list.component';
import { PostalCodeCreateComponent } from './Postal Code/postal-code-create/postal-code-create.component';
import { DeliveryTypeListComponent } from './DeliveryType/delivery-type-list/delivery-type-list.component';
import { DeliveryTypeCreateComponent } from './DeliveryType/delivery-type-create/delivery-type-create.component';
import { InvoiceTermListComponent } from './InvoiceTerm/invoice-term-list/invoice-term-list.component';
import { InvoiceTermCreateComponent } from './InvoiceTerm/invoice-term-create/invoice-term-create.component';
import { VehicleSizeListComponent } from './VehicleSize/vehicle-size-list/vehicle-size-list.component';
import { VehicleSizeCreateComponent } from './VehicleSize/vehicle-size-create/vehicle-size-create.component';
import { UnitListComponent } from './Unit/unit-list/unit-list.component';
import { CreateUnitListComponent } from './Unit/create-unit-list/create-unit-list.component';
import { CurrencyListComponent } from './Currency/currency-list/currency-list.component';
import { CurrencyCreateComponent } from './Currency/currency-create/currency-create.component';
import { ClientBasicDetailsComponent } from './Client/client-basic-details/client-basic-details.component';
import { ClientEditViewInfoComponent } from './Client/client-edit-view-info/client-edit-view-info.component';
import { ClientOtherDeailsComponent } from './Client/client-other-deails/client-other-deails.component';
import { ClientDocumentUploadComponent } from './Client/client-document-upload/client-document-upload.component';
import { ClientEditViewContactDetailsComponent } from './Client/client-edit-view-contact-details/client-edit-view-contact-details.component';
import { ClientContactDetailsComponent } from './Client/client-contact-details/client-contact-details.component';
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
    PostalCodeListComponent,
    PostalCodeCreateComponent,
    DeliveryTypeListComponent,
    DeliveryTypeCreateComponent,
    InvoiceTermListComponent,
    InvoiceTermCreateComponent,
    VehicleSizeListComponent,
    VehicleSizeCreateComponent,
    UnitListComponent,
    CreateUnitListComponent,
    CurrencyCreateComponent,
    CurrencyListComponent,
    ClientBasicDetailsComponent,
    ClientEditViewInfoComponent,
    ClientOtherDeailsComponent,
    ClientDocumentUploadComponent,
    ClientEditViewContactDetailsComponent,
    ClientContactDetailsComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    ReactiveFormsModule,
    FormsRoutingModule,
    MatModule,

  ]
})
export class MasterModule {}
