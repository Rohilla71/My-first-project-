import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from '../city.service';
import { catchError, map, startWith, switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { CityCreateComponent } from '../city-create/city-create.component';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-city-list-test',
  templateUrl: './city-list-test.component.html',
  styleUrls: ['./city-list-test.component.scss']
})
export class CityListTestComponent implements OnInit {
  ngOnInit(): void { }

  // displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  displayedColumns: string[] = ['id', 'name', 'stateId', 'isActive', 'latitude', 'longitude', 'lastActionBy', 'lastActionOn', 'actions'];

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
  ) { }



  add(): void {
    debugger

    const dialogRef = this.dialog.open(CityCreateComponent, {
      width: '800px',
      disableClose: true
      //  /data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.GetCityList();
      console.log('The dialog was closed');
    });
  }

  edit(city: any): void {
    debugger
    const dialogRef = this.dialog.open(CityCreateComponent, {
      data: { city },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.GetCityList();
      console.log('The dialog was closed');
    });
  }

  delete(id: any): void {
    debugger

    this.service.DeleteCity(id).subscribe(p => {
      debugger
      if (p) {
        this.service.cities = p;
        //this.bindTable(this.service.cities);
      }
    }),
      error => {
        debugger;
        console.log(error);
      }

  }

  searchKeywordFilter = new FormControl();
  
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.searchKeywordFilter.valueChanges, this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          var filterValue = this.searchKeywordFilter.value == null ? '' : this.searchKeywordFilter.value;
          return this.service
            .getCities(
              this.sort.active,
              this.sort.direction,
              filterValue,
              this.paginator.pageIndex + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          debugger
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.totalRecords;
          return data.data;
        })
      )
      .subscribe((data) => (this.dataSource = data,
        console.log("datasource"),
        console.log(this.dataSource)
      ));
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
