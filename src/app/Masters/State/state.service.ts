import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { State } from './state.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private _httpClient: HttpClient) {}

  GetAllStateList(): Observable<State> {
    return this._httpClient
      .get<State>(`${environment.APiUrl}Master/GetStateList`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  GetStateById(id: number) {
    return this._httpClient
      .get(`${environment.APiUrl}Master/GetState${id}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  CreateState(data: any) {
    var UserId = localStorage.getItem('userId');
    const payload = {
      ...data,
      updatedBy: 0,
      createdBy: Number(UserId),
    };
    return this._httpClient
      .post(`${environment.APiUrl}Master/CreateState`, payload)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  DeleteState(id: number) {
    return this._httpClient
      .delete(`${environment.APiUrl}Master/DeleteState/${id}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  UpdateState(id: number, data: any) {
    var UserId = localStorage.getItem('userId');
    const payload = {
      ...data,
      updatedBy: Number(UserId),
      createdBy: Number(0),
    };
    return this._httpClient
      .patch(`${environment.APiUrl}Master/UpdateState/${id}`, payload)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }
}
