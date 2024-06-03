import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SideMenuResponse } from 'src/app/Interfaces/SideMenu';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  
  constructor(private http : HttpClient) { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    // return this.http.get<SideMenuResponse>("http://122.176.139.224:84/api/Master/GetMenuMasterList");
    return this.http.get<SideMenuResponse>("./assets/JSON/sidemenu.json");
  }
}
