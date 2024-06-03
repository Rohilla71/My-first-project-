import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitListService {
 
    cities=[];
    states=[];

  constructor(private http: HttpClient) { }


  GetUnitList() {
    return this.http.get<any>(`${environment.APiUrl}Master/GetUnitList`).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }

  createUnitList(form: any) {
    let data = {
      id: 0,
      name: form.name,
      description: form.description,
      isActive: form.isActive 
    }
    return this.http.post<any>(`${environment.APiUrl}Master/CreateUnit`, data).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }

  UpdateUnitList(id: any, form: any) {
    let data = {
      id: form.id,
      name: form.name,
      description: form.description,
      isActive: form.isActive
    }
    return this.http.patch<any>(`${environment.APiUrl}Master/UpdateUnit/${id}`, data).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }
}