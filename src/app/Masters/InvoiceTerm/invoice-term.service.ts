import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { invoiceTermI } from 'src/app/Interfaces/InvoiceTerm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceTermService {
  constructor(private _httpClient: HttpClient) {}

  GetAllInvoiceTermList(): Observable<invoiceTermI> {
    return this._httpClient
      .get<invoiceTermI>(`${environment.APiUrl}Master/GetInvoiceTermList`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  GetInvoiceTermById(id: number) {
    return this._httpClient
      .get(`${environment.APiUrl}Master/GetInvoiceTerm${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  CreateInvoiceTerm(data: any) {
    return this._httpClient
      .post(`${environment.APiUrl}Master/CreateInvoiceTerm`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  DeleteInvoiceTerm(id: number) {
    return this._httpClient
      .delete(`${environment.APiUrl}Master/DeleteInvoiceTerm/${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  UpdateInvoiceTerm(id: number, data: any) {
    return this._httpClient
      .patch(`${environment.APiUrl}Master/UpdateInvoiceTerm/${id}`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
