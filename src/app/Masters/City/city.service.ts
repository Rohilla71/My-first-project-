import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
 
    cities=[];
    states=[];

  constructor(private http: HttpClient) { }


  GetCityList() {
    return this.http.get<any>(`${environment.APiUrl}Master/GetCityList`).pipe(
      // map(res=> res.posts),
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }

  GetCity(id: any) {
    return this.http.get<any>(`${environment.APiUrl}Master/GetCity/${id}`).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }

  GetStateByCountryId(id: any) {
    return this.http.get<any>(`${environment.APiUrl}Master/GetStateByCountryId/${id}`).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }

  GetCountryByStateId(id: any) {
    return this.http.get<any>(`${environment.APiUrl}Master/GetCountryByStateId/${id}`).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }

  CreateCity(form: any) {
    debugger
    // var UserId = 1
    var UserId = localStorage.getItem('userId');
    let data = {
      "id": form.id,
      "name": form.name,
      "stateId": Number(form.stateId),
      "isActive": Boolean(form.isActive),
      "latitude": String(form.latitude),
      "longitude": String(form.longitude),
      "createdBy": Number(UserId),
      "updatedBy": form.updatedBy
    }
    return this.http.post<any>(`${environment.APiUrl}Master/CreateCity`, data).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }

  UpdateCity(id: any, form: any) {
    // var UserId = 1
    var UserId = localStorage.getItem('userId');
    let data = {
      "id": form.id,
      "name": form.name,
      "stateId": Number(form.stateId),
      "isActive": Boolean(form.isActive),
      "latitude": String(form.latitude),
      "longitude": String(form.longitude),
      "createdBy": 0,
      "updatedBy": Number(UserId)
    }
    return this.http.patch<any>(`${environment.APiUrl}Master/UpdateCity/${id}`, data).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }
  
  DeleteCity(id: any) {
    return this.http.delete<any>(`${environment.APiUrl}Master/DeleteCity/${id}`).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }
}