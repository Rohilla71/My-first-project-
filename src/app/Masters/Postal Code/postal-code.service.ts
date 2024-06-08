import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityService } from '../City/city.service';
import { CountryService } from '../Country/country.service';

@Injectable({
  providedIn: 'root',
})
export class PostalCodeService {
  PostalCodeData = [];

  constructor(private http: HttpClient,
    public cityService: CityService,
    public countryService: CountryService,
  ) {}

  // PostalCodeList() {
  //   return this.http
  //     .get<any>(`${environment.APiUrl}Master/GetPostalCodePagedData`)
  //     .pipe(
  //       catchError((err) => {
  //         return throwError(() => err);
  //       })
  //     );
  // }

  public PostalCodeList(
    sortBy: string,
    sortDirection: SortDirection,
    filter: String,
    pageNumber: number,
    pageSize: number

    // pageNumber: Number,
    // pageSize: Number,
    // filter : String,
    // sortBy : String,
    // sortDirection : String,
  ): Observable<any> {
    const url = `${environment.APiUrl}Master/GetPostalCodePagedData?pageNumber=${pageNumber}&pageSize=${pageSize}&filter=${filter}&sortBy=${sortBy}&sortDirection=${sortDirection}`;

    return this.http.get<any>(url);
  }


  CreatePostalCode(data: any) {
    return this.http
      .post(`${environment.APiUrl}Master/CreatePostalCode`, data)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  UpdatePostalCode(id: number, data: any) {
    return this.http
      .patch(`${environment.APiUrl}Master/UpdatePostalCode/${id}`, data)
      .pipe(
        catchError((err) => {
          //this.openSnackbar(err.error.message, 'close')
          return throwError(() => err);
        })
      );
  }
}
