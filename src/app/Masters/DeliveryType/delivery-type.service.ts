import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeliveryTypeI } from 'src/app/Interfaces/DeliveryType';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class DeliveryTypeService {
  constructor(
    private _httpClient: HttpClient,
    private _snackBarService: SnackBarService
  ) {}

  GetAllDeliveryList(): Observable<DeliveryTypeI> {
    return this._httpClient
      .get<DeliveryTypeI>(`${environment.APiUrl}Master/GetDelieveryTypeList`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  GetDeliveryTypeById(id: number) {
    return this._httpClient
      .get(`${environment.APiUrl}Master/GetDelieveryType${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  CreateDeliveryType(data: any) {
    return this._httpClient
      .post(`${environment.APiUrl}Master/CreateDelieveryType`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  DeleteDeliveryType(id: number) {
    return this._httpClient
      .delete(`${environment.APiUrl}Master/DeleteDelieveryType/${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  UpdateDeliveryType(id: number, data: any) {
    return this._httpClient
      .patch(`${environment.APiUrl}Master/UpdateDelieveryType/${id}`, data)
      .pipe(
        catchError((err) => {
          this._snackBarService.openSnackbar(err.error.message, 'close');
          return throwError(() => err);
        })
      );
  }
}
