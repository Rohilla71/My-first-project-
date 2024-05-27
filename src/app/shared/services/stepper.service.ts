import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor(private http: HttpClient) { }

  postStepperData(data) {
    return this.http.post('http://122.176.139.224:84/api/Master/CreateClient', data)

   // return this.http.get('assets/json/stepperdata.json')
  }

  getCountry() {
    return this.http.get('http://122.176.139.224:84/api/Master/GetCountryList')
  }
  getState(id) {
    return this.http.get('http://122.176.139.224:84/api/Master/GetStateByCountryId/' +id  )
  }
  getCity(id) {
    return this.http.get('http://122.176.139.224:84/api/Master/GetCityByStateId/' + id )
  }
}
