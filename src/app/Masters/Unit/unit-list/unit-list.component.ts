import { UnitService } from './../unit.service';
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreateUnitListComponent } from '../create-unit-list/create-unit-list.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

export interface UnitListData {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  lastActionBy: string;
  lastActionOn: string;
}
@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'isActive',
    'lastActionBy',
    'lastActionOn',
    'actions',
  ];
  isLoading = true;
  unitList = [];

  @ViewChild('input') input: ElementRef<any>;
  dataSource: MatTableDataSource<UnitListData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private service: UnitService,
    public dialog: MatDialog,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.getUnitList();
  }

  add(): void {
    const dialogRef = this.dialog.open(CreateUnitListComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUnitList();
      this.input.nativeElement.value = "";
    });
  }

  edit(listdata: any): void {
    const dialogRef = this.dialog.open(CreateUnitListComponent, {
      data: { listdata },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUnitList();
      this.input.nativeElement.value = "";
    });
  }

  delete(id: any): void {
    // this.service.DeleteCity(id).subscribe(p => {
    //
    //   if (p) {
    //     this.service.cities = p;
    //     this.bindTable(this.service.cities);
    //   }
    // }),
    //   error => {
    //     ;
    //   }
    // const dialogRef = this.dialog.open(AddCityComponent, {
    //   width: '800px',
    //   data: { id },
    //   disableClose: true
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.GetCountryList();
    // });
  }

  getUnitList() {
    this.service.GetUnitList().subscribe((p) => {
      if (p.success == true) {
        this.isLoading = false;
        this.unitList = p?.data;
        this.dataSource = new MatTableDataSource(this.unitList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.bindTable(this.unitList);
      }
    }),
      (error) => {
        this.isLoading = false;
        this._snackBarService.openSnackbar(error.message, 'close');
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
