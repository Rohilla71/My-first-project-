import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, catchError, throwError } from 'rxjs';
import { User } from 'src/app/Interfaces/User';
import { environment } from 'src/environments/environment';
import { ClientListResponse } from 'src/app/Interfaces/ClientList';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  baseUrl = environment.APiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  getClients() {
    //return this.http.get<ClientListResponse>("http://122.176.139.224:84/api/Master/GetMenuMasterList");
    return this.http.get<ClientListResponse>("./assets/JSON/clientlist.json");
  }  

}
