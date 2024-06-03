import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { CityService } from '../city.service';
import { CityCreateComponent } from '../city-create/city-create.component';

export interface CityData {
  id: number;
  name: string;
  stateId: number;
  isActive: boolean;
  latitude: string;
  longitude: string;
  createdBy: number;
  updatedBy: number;
}

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss'
})
export class CityListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'stateId', 'isActive', 'latitude', 'longitude', 'lastActionBy', 'lastActionOn', 'actions'];

  isLoading = true;
  dataSource: MatTableDataSource<CityData>;
  cities: CityData[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public service: CityService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    debugger
    this.GetCityList();
  }


  //region

  add(): void {
    debugger

    const dialogRef = this.dialog.open(CityCreateComponent, {
      width: '800px',
      disableClose: true
      //  /data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetCityList();
      console.log('The dialog was closed');
    });
  }

  edit(city: any): void {
    debugger
    const dialogRef = this.dialog.open(CityCreateComponent, {
      // width: '800px',
      data: { city },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetCityList();
      console.log('The dialog was closed');
    });
  }

  delete(id: any): void {
    debugger

    this.service.DeleteCity(id).subscribe(p => {
      debugger
      if (p) {
        this.service.cities = p;
        this.bindTable(this.service.cities);
      }
    }),
      error => {
        debugger;
        console.log(error);
      }
    // const dialogRef = this.dialog.open(AddCityComponent, {
    //   width: '800px',
    //   data: { id },
    //   disableClose: true
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.GetCountryList();
    //   console.log('The dialog was closed');
    // });
  }
  tempCity = [
    {
      "id": 140413,
      "name": "'Ali Sabieh",
      "stateId": 1537,
      "isActive": true,
      "latitude": "11.15583",
      "longitude": "42.7125",
      "createdBy": 1,
      "updatedBy": null
    },
    {
      "id": 214152,
      "name": "'s-Graveland",
      "stateId": 3324,
      "isActive": true,
      "latitude": "52.2442",
      "longitude": "5.1211",
      "createdBy": 1,
      "updatedBy": null
    },
    {
      "id": 265151,
      "name": "demo26",
      "stateId": 1,
      "isActive": true,
      "latitude": "12",
      "longitude": "1234",
      "createdBy": 1,
      "updatedBy": null
  }];

  GetCityList() {
    debugger
    // this.bindTable(this.tempCity);
    this.service.GetCityList().subscribe(p => {
      debugger
      if (p.success == true) {
        this.isLoading = false;
        this.service.cities = p?.data;
        this.bindTable(this.service.cities);
      }
    }),
      error => {
        debugger;
        this.isLoading = false;
        console.log(error);
      }

  }

  bindTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //endregion

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
