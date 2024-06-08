
import { UnitListService } from '../unit-list.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { CreateUnitListComponent } from '../create-unit-list/create-unit-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCustomerComponent } from '../../Masters/Customer/create-customer/create-customer.component';
// import { CityCreateComponent } from '../city-create/city-create.component';

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
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'isActive', 'lastActionBy', 'lastActionOn', 'actions'];
  isLoading = true;
  unitList = []
  dataSource: MatTableDataSource<UnitListData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: UnitListService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
this.getUnitList()
  }

  
  add(): void {

   
    const dialogRef = this.dialog.open(CreateUnitListComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUnitList();
      console.log('The dialog was closed');
    });
  }

  edit(listdata: any): void {
    
    const dialogRef = this.dialog.open(CreateUnitListComponent, {
      data: { listdata },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUnitList();
      console.log('The dialog was closed');
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
    //     console.log(error);
    //   }
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

  getUnitList() {
    this.service.GetUnitList().subscribe(p => {
      if (p.success == true) {
        this.isLoading = false;
        this.unitList = p?.data;
        this.bindTable(this.unitList);
      }
    }),
      error => {
        this.isLoading = false;
        this.snackBar.open(error.message, 'Dismiss');
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
