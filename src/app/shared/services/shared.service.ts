import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private _httpClient: HttpClient) {}

  getPostalCodeByCityId(cityId: number) {
    return this._httpClient.get(
      `${environment.APiUrl}Master/GetPostalCodeListByCityId?cityId=${cityId}`
    );
  }
}
