import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Currency } from 'src/app/Interfaces/Currency';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    private _httpClient: HttpClient,
    private _snackBarService: SnackBarService
  ) {}

  GetAllCurrencyList(): Observable<Currency> {
    return this._httpClient
      .get<Currency>(`${environment.APiUrl}Master/GetCurrencyList`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  GetCurrencyById(id: number) {
    return this._httpClient
      .get(`${environment.APiUrl}Master/GetCurrency${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  CreateCurrency(data: any) {
    return this._httpClient
      .post(`${environment.APiUrl}Master/CreateCurrency`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  DeleteCurrency(id: number) {
    return this._httpClient
      .delete(`${environment.APiUrl}Master/DeleteCurrency/${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  UpdateCurrency(id: number, data: any) {
    return this._httpClient
      .patch(`${environment.APiUrl}Master/UpdateCurrency/${id}`, data)
      .pipe(
        catchError((err) => {
          this._snackBarService.openSnackbar(err.error.message, 'close');
          return throwError(() => err);
        })
      );
  }
}
