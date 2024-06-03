import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DeliveryStatusService {

    DelieveryStatusList=[];
    constructor(private http: HttpClient) { }

    GetDelieveryStatusList() {
        return this.http.get<any>(`${environment.APiUrl}Master/GetDelieveryStatusList`).pipe(
            catchError(err => {
                console.log(err)
                return throwError(() => err)
            })
        )
    }

    GetDelieveryStatus(id: any) {
        return this.http.get<any>(`${environment.APiUrl}Master/GetDelieveryStatus/${id}`).pipe(
            catchError(err => {
                console.log(err)
                return throwError(() => err)
            })
        )
    }

    CreateDelieveryStatus(form: any) {
        // let formData = {
        //     "id": 0,
        //     "name": "string",
        //     "description": "string",
        //     "isActive": true,
        //     "lastActionBy": "string",
        //     "lastActionOn": "2024-05-29T05:08:41.396Z",
        //     "createdBy": 0,
        //     "updatedBy": 0
        // }

        var formData = new FormData();
        formData.append('id',form.id);
        formData.append('name',form.name);
        formData.append('description',form.description);
        formData.append('isActive',form.isActive);
        formData.append('lastActionBy',form.lastActionBy);
        formData.append('lastActionOn',form.lastActionOn);
        formData.append('createdBy',form.createdBy);
        formData.append('updatedBy',form.updatedBy);

        return this.http.post<any>(`${environment.APiUrl}Master/CreateDelieveryStatus`, formData).pipe(
            catchError(err => {
                console.log(err)
                return throwError(() => err)
            })
        )
    }


    UpdateDelieveryStatus(id: any, form: any) {
        debugger
        var formData = new FormData();
        formData.append('id',form.id);
        formData.append('name',form.name);
        formData.append('description',form.description);
        formData.append('isActive',form.isActive);
        formData.append('lastActionBy',form.lastActionBy);
        formData.append('lastActionOn',form.lastActionOn);
        formData.append('createdBy',form.createdBy);
        formData.append('updatedBy',form.updatedBy);
        
        // let formData = {
        //     "id": 0,
        //     "name": "string",
        //     "description": "string",
        //     "isActive": true,
        //     "lastActionBy": "string",
        //     "lastActionOn": "2024-05-29T05:08:41.396Z",
        //     "createdBy": 0,
        //     "updatedBy": 0
        // }
        return this.http.patch<any>(`${environment.APiUrl}Master/UpdateDelieveryStatus/${id}`, formData).pipe(
            catchError(err => {
                console.log(err)
                return throwError(() => err)
            })
        )
    }

    DeleteCountry(id: any) {
        return this.http.delete<any>(`${environment.APiUrl}Master/DeleteCountry/${id}`).pipe(
            catchError(err => {
                console.log(err)
                return throwError(() => err)
            })
        )
    }
}