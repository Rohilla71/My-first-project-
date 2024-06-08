import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CityService } from '../city.service';
import { CityCreateComponent } from '../city-create/city-create.component';
import { FormControl } from '@angular/forms';
import {
  catchError,
  map,
  merge,
  Observable,
  of as observableOf,
  pipe,
  startWith,
  switchMap,
} from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

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
  styleUrl: './city-list.component.scss',
})
export class CityListComponent implements OnInit {
  ngOnInit(): void { }

  displayedColumns: string[] = [
    'id',
    'name',
    'stateId',
    'isActive',
    'latitude',
    'longitude',
    'lastActionBy',
    'lastActionOn',
    'actions',
  ];

  data: GithubIssue[] = [];
  dataSource: MatTableDataSource<any>;
  pageSizes = [10, 30, 50];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public service: CityService, 
    public dialog: MatDialog,
    public snackBarService : SnackBarService
  ) { }

  add(): void {
    const dialogRef = this.dialog.open(CityCreateComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dataBinding();
    });
  }

  edit(city: any): void {
    const dialogRef = this.dialog.open(CityCreateComponent, {
      data: { city },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dataBinding();
    });
  }

  delete(id: any): void {
    this.service.DeleteCity(id).subscribe((p) => {
      if (p) {
        this.snackBarService.openSnackbar("city deleted", "success");
        this.service.cities = p;
        //this.bindTable(this.service.cities);
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, "error");
      };
  }

  searchKeywordFilter = new FormControl();

  ngAfterViewInit() {
    this.dataBinding();
  }

  dataBinding() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.searchKeywordFilter.valueChanges,
      this.sort.sortChange,
      this.paginator.page
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          var filterValue =
            this.searchKeywordFilter.value == null
              ? ''
              : this.searchKeywordFilter.value;
          return this.service
            .getCities(
              this.sort.active,
              this.sort.direction,
              filterValue,
              this.paginator.pageIndex + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => 
              observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.data.totalRecords;
          return data.data.data;
        })
      )
      .subscribe((data) => (this.dataSource = data));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}
