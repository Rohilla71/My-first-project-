import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './Client/client-list/client-list.component';
import { ClientCreateComponent } from './Client/client-create/client-create.component';
import { CountryCreateComponent } from './Country/country-create/country-create.component';
import { CountryListComponent } from './Country/country-list/country-list.component';
import { StateCreateComponent } from './State/state-create/state-create.component';
import { StateListComponent } from './State/state-list/state-list.component';
import { CityCreateComponent } from './City/city-create/city-create.component';
import { CityListComponent } from './City/city-list/city-list.component';
import { DeliveryStatusListComponent } from './Delivery Status/delivery-status-list/delivery-status-list.component';
import { DeliveryStatusCreateComponent } from './Delivery Status/delivery-status-create/delivery-status-create.component';

import { PostalCodeCreateComponent } from './Postal Code/postal-code-create/postal-code-create.component';
import { PostalCodeListComponent } from './Postal Code/postal-code-list/postal-code-list.component';
import { UnitListComponent } from './Unit/unit-list/unit-list.component';
import { DeliveryTypeListComponent } from './DeliveryType/delivery-type-list/delivery-type-list.component';
import { InvoiceTermListComponent } from './InvoiceTerm/invoice-term-list/invoice-term-list.component';
import { VehicleSizeListComponent } from './VehicleSize/vehicle-size-list/vehicle-size-list.component';
import { CurrencyListComponent } from './Currency/currency-list/currency-list.component';
import { ClientEditViewInfoComponent } from './Client/client-edit-view-info/client-edit-view-info.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'client-add',
        component: ClientCreateComponent,
        data: {
          title: 'Add Client'
        }
      },
      {
        path: 'client-list',
        component: ClientListComponent,
        data: {
          title: 'Client List'
        }
      },
      {
        path: 'client-info',
        component: ClientEditViewInfoComponent,
        data: {
          title: 'Client List'
        }
      },
      
      {
        path: 'country-add',
        component: CountryCreateComponent,
        data: {
          title: 'Add Country'
        }
      },
      {
        path: 'country-list',
        component: CountryListComponent,
        data: {
          title: 'Country List'
        }
      },
      {
        path: 'state-add',
        component: StateCreateComponent,
        data: {
          title: 'Add State'
        }
      },
      {
        path: 'state-list',
        component: StateListComponent,
        data: {
          title: 'State List'
        }
      },
      {
        path: 'city-add',
        component: CityCreateComponent,
        data: {
          title: 'Add City'
        }
      },
      {
        path: 'city-list',
        component: CityListComponent,
        data: {
          title: 'City List'
        }
      },
      {
        path: 'delivery-status-add',
        component: DeliveryStatusCreateComponent,
        data: {
          title: 'Add Delivery Status'
        }
      },
      {
        path: 'delivery-status-list',
        component: DeliveryStatusListComponent,
        data: {
          title: 'Delivery Status List'
        }
      },
      {
        path: 'postal-code-add',
        component: PostalCodeCreateComponent,
        data: {
          title: 'Add Postal Code'
        }
      },
      {
        path: 'postal-code-list',
        component: PostalCodeListComponent,
        data: {
          title: 'Postal Code List'
        }
      },
      {
        path: 'unit-list',
        component: UnitListComponent,
        data: {
          title: 'Unit List',
        },
      },
      {
        path: 'currency-list',
        component: CurrencyListComponent,
        data: {
          title: 'Currency List',
        },
      },
      {
        path: 'delivery-list',
        component: DeliveryTypeListComponent,
        data: {
          title: 'Delivery Type List',
        },
      },
      {
        path: 'invoice-term-list',
        component: InvoiceTermListComponent,
        data: {
          title: 'Invoice Term List',
        },
      },
      {
        path: 'vehicle-size-list',
        component: VehicleSizeListComponent,
        data: {
          title: 'Vehicle Size List',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
