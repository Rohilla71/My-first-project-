import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PostalCodeCreateComponent } from '../postal-code-create/postal-code-create.component';
import { PostalCodeService } from '../postal-code.service';
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

@Component({
  selector: 'app-postal-code-list',
  templateUrl: './postal-code-list.component.html',
  styleUrls: ['./postal-code-list.component.scss'],
})
export class PostalCodeListComponent implements OnInit {
  ngOnInit(): void {}
  displayedColumns: string[] = [
    'id',
    'country',
    'state',
    'city',
    'postalCode',
    'latitude',
    'longitude',
    'isTaxApplicable',
    'taxRate',
    'description',
    'lastActionBy',
    'lastActionOn',
    'isActive',
    'actions',
  ];

  isLoading = true;

  @ViewChild('input') input: ElementRef<any>;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults = true;
  pageSizes = [10, 30, 50];

  resultsLength = 0;

  constructor(
    public service: PostalCodeService,
    public dialog: MatDialog //private toastr: ToastrService
  ) {}

  add(): void {
    const dialogRef = this.dialog.open(PostalCodeCreateComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dataBinding();
      this.input.nativeElement.value = "";
    });
  }

  edit(data: any): void {
    const dialogRef = this.dialog.open(PostalCodeCreateComponent, {
      width: '800px',
      data: { data },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dataBinding();
      this.input.nativeElement.value = "";
    });
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
            .PostalCodeList(
              this.sort.active,
              this.sort.direction,
              filterValue,
              this.paginator.pageIndex + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
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
