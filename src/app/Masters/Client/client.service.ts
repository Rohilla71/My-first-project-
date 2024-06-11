import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, catchError, throwError } from 'rxjs';
import { User } from 'src/app/Interfaces/User';
import { environment } from 'src/environments/environment';
import { ClientListResponse } from 'src/app/Interfaces/ClientList';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  customerId;
  public contactSubmitEvent = new Subject<any>
  baseUrl = environment.APiUrl;
  constructor(private http: HttpClient, private router: Router) { }

  getClients() {
    return this.http.get<ClientListResponse>(`${environment.APiUrl}Client/GetCustomerList`);
    // return this.http.get<ClientListResponse>("./assets/JSON/clientlist.json");
  }

  UpdateOtherDetails(form: any, id) {
    
    return this.http.patch<any>(`${environment.APiUrl}Client/CustomerOtherDetails/${id}`, form).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )

    // return this.http.get('./assets/JSON/createcustomer.json')
  }

  createNewCustomer(form: any) {
    let data = {
      id: 0,
      customerType: form.customerType,
      name: form.companyName,
      email: form.customerEmail,
      phone: form.customerPhone,
      mobile: form.customerMobile,
      languageId: form.language,
      address1: form.address1,
      address2: form.address2,
      countryId: form.country,
      stateId: form.state,
      cityId: form.city,
      postalCodeId: form.postalCode,
      landmark: form.landmark
    }
    return this.http.post<any>(`${environment.APiUrl}Client/NewCustomer`, data).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )

    // return this.http.get('./assets/JSON/createcustomer.json')
  }

  upload(data) {
    return this.http.post<any>(`${environment.APiUrl}Client/UploadFile`, data).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }
  getCountry() {
    return this.http.get(`${environment.APiUrl}Master/GetCountryList`)
  }
  getState(id) {
    return this.http.get(`${environment.APiUrl}Master/GetStateByCountryId/` + id)
  }
  getCity(id) {
    return this.http.get(`${environment.APiUrl}Master/GetCityByStateId/` + id)
  }
  getPostCode(id) {
    return this.http.get(`${environment.APiUrl}Master/GetPostalCodeListByCityId?cityId=` + id)
  }
  getOtherDetails() {
    return this.http.get(`${environment.APiUrl}Master/GetCityByStateId/`)
  }
  getFileUploadListDetails(id) {
    return this.http.get(`${environment.APiUrl}Client/GetDocumentsByClientId?clientId=` + id)
    //  return this.http.get('./assets/JSON/clientdocumentlist.json')
  }

  getLanguage() {
    return this.http.get(`${environment.APiUrl}Master/GetLanguageList`)
  }
  getBasicDetails(id) {
    return this.http.get(`${environment.APiUrl}Client/GetCustomer/` + id)
  }
  getotherdetailstab(id) {
    return this.http.get(`${environment.APiUrl}Client/GetOtherDetailsById?customerId=` + id)
  }

  updateBasicDetails(id, data) {
    return this.http.patch<any>(`${environment.APiUrl}Client/UpdateCustomer/${id}`, data).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }

  getCustomerTypeList() {
    return this.http.get(`${environment.APiUrl}Client/GetCustomerTypeList`)
  }
  getCurrency() {
    return this.http.get(`${environment.APiUrl}Master/GetCurrencyList`)
  }
  getTaxTreatment() {
    return this.http.get(`${environment.APiUrl}Client/GetTaxTreatmentList`)
  }
  getTaxPreference() {
    return this.http.get(`${environment.APiUrl}Client/GetTaxPreferenceList`)
  }
  getActiveLanguageList() {
    return this.http.get(`${environment.APiUrl}Master/GetActiveLanguageList`)
  }

  getContactDetailsList(id) {
   //return this.http.get(`${environment.APiUrl}Client/GetContactDetailsByClientId?clientId=` + id)
    return this.http.get('./assets/JSON/getcontactpersonDetails.json')
  }

  getSalutationList() {
    return this.http.get(`./assets/JSON/getSalutationList.json`)
  }
  getCommunicationList() {
    return this.http.get(`./assets/JSON/getCommunicationTypeList.json`)
  }
  
  createContact(data) {
    return this.http.get('./assets/JSON/PostContactDetails.json')
    // return this.http.post<any>(`${environment.APiUrl}Client/CreateContactDetail`, data).pipe(
    //   catchError(err => {
    //     console.log(err)
    //     return throwError(() => err)
    //   })
    // )
  }

  updateContact(id, data) {
    return this.http.get('./assets/JSON/PostContactDetails.json')
    // return this.http.post<any>(`${environment.APiUrl}Client/UpdateContactDetails`, data).pipe(
    //   catchError(err => {
    //     console.log(err)
    //     return throwError(() => err)
    //   })
    // )
  }

}
