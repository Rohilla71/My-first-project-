import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  currency = [];
  countries = [];

  constructor(private http: HttpClient) {}

  GetCountryList() {
    return this.http
      .get<any>(`${environment.APiUrl}Master/GetCountryList`)
      .pipe(
        // map(res=> res.posts),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  GetCurrencyList() {
    return this.http
      .get<any>(`${environment.APiUrl}Master/GetCurrencyList`)
      .pipe(
        // map(res=> res.posts),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  GetCountry(id: any) {
    return this.http
      .get<any>(`${environment.APiUrl}Master/GetCountry/${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  CreateCountry(form: any) {
    var UserId = localStorage.getItem('userId');
    let data = {
      id: Number(form.id),
      name: form.name,
      code: form.code,
      callingCode: form.callingCode,
      currencyId: Number(form.currencyId),
      isActive: form.isActive,
      capital: form.capital,
      latitude: String(form.latitude),
      longitude: String(form.longitude),
      timeZone: form.timeZone,
      flagEmoji: form.flagEmoji,
      nationality: '',
      createdBy: Number(UserId),
      updatedBy: Number(form.updatedBy),
    };
    // let payload={
    //   ...form,
    //   createdBy: Number(UserId),
    //   updatedBy: 0,
    // }
    return this.http
      .post<any>(`${environment.APiUrl}Master/CreateCountry`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  UpdateCountry(id: any, form: any) {
    var UserId = localStorage.getItem('userId');
    let data = {
      id: form.id,
      name: form.name,
      code: form.code,
      callingCode: form.callingCode,
      currencyId: form.currencyId,
      isActive: form.isActive,
      capital: form.capital,
      latitude: form.latitude,
      longitude: form.longitude,
      timeZone: form.timeZone,
      flagEmoji: form.flagEmoji,
      nationality: '',
      createdBy: Number(form.createdBy),
      updatedBy: Number(UserId),
    };
    // let payload={
    //   ...form,
    //   createdBy: form.createdBy,
    //   updatedBy: Number(UserId),
    // }
    return this.http
      .patch<any>(`${environment.APiUrl}Master/UpdateCountry/${id}`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  DeleteCountry(id: any) {
    return this.http
      .delete<any>(`${environment.APiUrl}Master/DeleteCountry/${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
