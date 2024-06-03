import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from './../sidebar/sidebar.service'
import { SideMenu, SideMenuResponse } from 'src/app/Interfaces/SideMenu';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  sideMenuList: SideMenu[]
    constructor(public sidebarservice: SidebarService
      ) { }

      getSideBarSate() {
          return this.sidebarservice.getSidebarState();
      }
  
    ngOnInit() {
        this.sidebarservice.getMenuList().subscribe((res:SideMenuResponse)=> {
            
            this.sideMenuList =res.data
        })
    }

}
