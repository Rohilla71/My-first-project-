import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeliveryStatusService {
  DeliveryStatusList = [];

  constructor(private http: HttpClient) {}

  GetDelieveryStatusList() {
    return this.http
      .get<any>(`${environment.APiUrl}Master/GetDelieveryStatusList`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  GetDelieveryStatus(id: any) {
    return this.http
      .get<any>(`${environment.APiUrl}Master/GetDelieveryStatus/${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  CreateDelieveryStatus(form: any) {
    var formData = {
      id: form.id,
      name: form.name,
      description: form.description,
      sequence: form.sequence,
      isActive: form.isActive,
    };
    return this.http
      .post<any>(`${environment.APiUrl}Master/CreateDelieveryStatus`, formData)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  UpdateDelieveryStatus(id: any, form: any) {
    var formData = {
      id: form.id,
      name: form.name,
      description: form.description,
      sequence: form.sequence,
      isActive: form.isActive,
    };

    return this.http
      .patch<any>(
        `${environment.APiUrl}Master/UpdateDelieveryStatus/${id}`,
        formData
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
