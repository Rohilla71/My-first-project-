import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryCreateComponent } from '../country-create/country-create.component';
import { CountryService } from '../country.service';


export interface CountryData {
  id: number;
  name: string;
  code: string;
  callingCode: string;
  currencyId: number;
  isActive: boolean;
  capital: string;
  latitude: string;
  longitude: string;
  timeZone: string;
  flagEmoji: string;
  nationality: string;
  createdBy: number;
  updatedBy: number;
}

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent {

  // displayedColumns: string[] = ['id', 'name', 'code', 'callingCode', 'currencyId', 'isActive', 'capital', 'latitude', 'longitude', 'timeZone', 'flagEmoji', 'nationality', 'createdBy', 'updatedBy', 'actions'];
  displayedColumns: string[] = [ 'id', 'name', 'code', 'callingCode', 'capital', 'nationality',   'latitude', 'longitude', 'lastActionBy', 'lastActionOn', 'isActive', 'actions'];

  isLoading = true;
  dataSource: MatTableDataSource<CountryData>;
  // countries: CountryData[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public countryService: CountryService,
    public dialog: MatDialog,
    //private toastr: ToastrService
  ) {
    debugger
    this.GetCountryList();
  }


  //region

  add(): void {
    debugger
    
    const dialogRef = this.dialog.open(CountryCreateComponent, {
      // width: '600px',
      disableClose: true
      //  /data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetCountryList();
      console.log('The dialog was closed');
    });
  }

  edit(country: any): void {
    debugger
    const dialogRef = this.dialog.open(CountryCreateComponent, {
      width: '800px',
      data: { country },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetCountryList();
      console.log('The dialog was closed');
    });
  }

  // delete(id: any): void {
  //   debugger

  //   this.configService.DeleteCountry(id).subscribe(p => {
  //     debugger
  //     if (p) {
  //       this.configService.countries = p;
  //       this.bindTable(this.configService.countries);
  //     }
  //   }),
  //     error => {
  //       debugger;
  //       console.log(error);
  //     }
  // //   const dialogRef = this.dialog.open(AddCountryComponent, {
  // //     width: '800px',
  // //     data: { id },
  // //     disableClose: true
  // //   });

  // //   dialogRef.afterClosed().subscribe(result => {
  // //     this.GetCountryList();
  // //     console.log('The dialog was closed');
  // //   });
  // }

  GetCountryList() {
    debugger
    this.countryService.GetCountryList().subscribe(p => {
      debugger
      if (p.success == true) {
        this.isLoading = false;
        this.countryService.countries = p?.data;
        this.bindTable(this.countryService.countries);
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
