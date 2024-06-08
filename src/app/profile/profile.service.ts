import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,
  ) {}

  UpdateUser(id: number, data: any) {
    return this.http
      .patch(`${environment.APiUrl}Authentication/UpdateUser?id=${id}`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  UploadImage(data: any) {
    var id = Number(localStorage.getItem('userId'));
    var formData = new FormData();
    formData.append("file", data)
    return this.http
      .post(`${environment.APiUrl}Authentication/UploadImage?id=${id}`, formData)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }


}
