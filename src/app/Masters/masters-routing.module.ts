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
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { CustomerListComponent } from './Customer/customer-list/customer-list.component';
import { LandingPageComponent } from './Customer/landing-page/landing-page.component';

// import { SigninWithHeaderFooterComponent } from './signin-with-header-footer/signin-with-header-footer.component';
// import { SignupWithHeaderFooterComponent } from './signup-with-header-footer/signup-with-header-footer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'client-list',
        component: ClientListComponent,
        data: {
          title: 'Client List'
        }
      },
      {
        path: 'client-add',
        component: ClientCreateComponent,
        data: {
          title: 'Add Client'
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
        path: 'customer-list',
        component: CustomerListComponent,
        data: {
          title: 'Customer List'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
