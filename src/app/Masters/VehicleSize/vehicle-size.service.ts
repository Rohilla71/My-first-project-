import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { VehicleSizeI } from 'src/app/Interfaces/VehicleSize';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleSizeService {

  constructor(private _httpClient: HttpClient, private _snackBar: MatSnackBar) {}

  GetAllVehicleSizeList(): Observable<VehicleSizeI> {
    return this._httpClient
      .get<VehicleSizeI>(`${environment.APiUrl}Master/GetVechileSizeList`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  GetVehicleSizeById(id: number) {
    return this._httpClient
      .get(`${environment.APiUrl}Master/GetVehicleSize${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  CreateVehicleSize(data: any) {
    return this._httpClient
      .post(`${environment.APiUrl}Master/CreateVehicleSize`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  UpdateVehicleSize(id: number, data: any) {
    return this._httpClient
      .patch(`${environment.APiUrl}Master/UpdateVehicleSize/${id}`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  openSnackbar(message: string, action: string){
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
