import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateCustomerService {

  constructor(private http: HttpClient) { }

  createNewCustomer(form: any) {
    let data = {
      id: 0,
      cutomerType: form.customerType,
      name: form.companyName,
      displayName: form.customerDisplayName,
      email: form.customerEmail,
      phone: form.customerPhone,
      mobile: form.customerMobile,
      languageId: form.language,
      address1: form.address1 ,
      address2: form.address2,
      countryId: form.country,
      stateId: form.state,
      cityId: form.city.value,
      postalCodeId: form.postalCode,
      landmark: form.landmark,
      currency: form.currency
    }
    return this.http.post<any>(`${environment.APiUrl}Master/CreateCustomer`, data).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )

   // return this.http.get('./assets/JSON/createcustomer.json')
  }

  getCountry() {
    return this.http.get(`${environment.APiUrl}/Master/GetCountryList`)
  }
  getState(id) {
    return this.http.get(`${environment.APiUrl}/Master/GetStateByCountryId/` +id  )
  }
  getCity(id) {
    return this.http.get(`${environment.APiUrl}/Master/GetCityByStateId/` + id )
  }
  getOtherDetails() {
    return this.http.get(`${environment.APiUrl}/Master/GetCityByStateId/`)
  }
  getCurrency() {
    return this.http.get(`${environment.APiUrl}/Master/GetCurrencyList`)
  }
  getTaxTreatment() {
    return this.http.get(`${environment.APiUrl}/Master/GetCountryList`)
  }
  getTaxPreference() {
    return this.http.get(`${environment.APiUrl}/Master/GetCountryList`)
  }
  getFileUploadDetails() {
    // return this.http.get(`${environment.APiUrl}/Master/GetCountryList`)
    return this.http.get('./assets/JSON/createcustomer.json')
  }
}
