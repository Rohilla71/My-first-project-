import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryCreateComponent } from '../country-create/country-create.component';
import { CountryService } from '../country.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

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
  styleUrl: './country-list.component.scss',
})
export class CountryListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'callingCode',
    'capital',
    'latitude',
    'longitude',
    'lastActionBy',
    'lastActionOn',
    'isActive',
    'actions',
  ];

  isLoading = true;
  dataSource: MatTableDataSource<CountryData>;
  // countries: CountryData[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public countryService: CountryService,
    public dialog: MatDialog, //private toastr: ToastrService
    public snackBarService : SnackBarService
  ) {}

  ngOnInit(): void {
    this.GetCountryList();
  }

  //region

  add(): void {
    const dialogRef = this.dialog.open(CountryCreateComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.GetCountryList();
    });
  }

  edit(country: any): void {
    const dialogRef = this.dialog.open(CountryCreateComponent, {
      width: '800px',
      data: { country },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.GetCountryList();
    });
  }

  // delete(id: any): void {
  //

  //   this.configService.DeleteCountry(id).subscribe(p => {
  //
  //     if (p) {
  //       this.configService.countries = p;
  //       this.bindTable(this.configService.countries);
  //     }
  //   }),
  //     error => {
  //       ;
  //     }
  // //   const dialogRef = this.dialog.open(AddCountryComponent, {
  // //     width: '800px',
  // //     data: { id },
  // //     disableClose: true
  // //   });

  // //   dialogRef.afterClosed().subscribe(result => {
  // //     this.GetCountryList();
  // //   });
  // }

  GetCountryList() {
    this.countryService.GetCountryList().subscribe((p) => {
      if (p.success == true) {
        this.isLoading = false;
        this.countryService.countries = p?.data;
        this.dataSource = new MatTableDataSource(this.countryService.countries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.bindTable(this.countryService.countries);
      }
    }),
      (error) => {
        debugger
        this.snackBarService.openSnackbar(error.message, "error");
        this.isLoading = false;
      };
  }

  bindTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //endregion

  ngAfterViewInit() {
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
