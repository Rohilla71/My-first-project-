import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryStatusService } from '../delivery-status.service';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryStatusCreateComponent } from '../delivery-status-create/delivery-status-create.component';

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
  selector: 'app-delivery-status-list',
  templateUrl: './delivery-status-list.component.html',
  styleUrls: ['./delivery-status-list.component.scss']
})
export class DeliveryStatusListComponent {

  displayedColumns: string[] = [ 'id', 'name', 'code', 'callingCode', 'capital', 'nationality',   'latitude', 'longitude', 'lastActionBy', 'lastActionOn', 'isActive', 'actions'];

  isLoading = true;
  dataSource: MatTableDataSource<CountryData>;
  // countries: CountryData[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public deliveryService: DeliveryStatusService,
    public dialog: MatDialog,
    //private toastr: ToastrService
  ) {
    debugger
    this.GetDelieveryStatusList();
  }


  //region

  add(): void {
    debugger
    
    const dialogRef = this.dialog.open(DeliveryStatusCreateComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.GetCountryList();
      console.log('The dialog was closed');
    });
  }

  edit(country: any): void {
    debugger
    const dialogRef = this.dialog.open(DeliveryStatusCreateComponent, {
      width: '800px',
      data: { country },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.GetCountryList();
      console.log('The dialog was closed');
    });
  }


  GetDelieveryStatusList() {
    debugger
    this.deliveryService.GetDelieveryStatusList().subscribe(p => {
      debugger
      if (p.success == true) {
        this.isLoading = false;
        this.deliveryService.DelieveryStatusList = p?.data;
        this.bindTable(this.deliveryService.DelieveryStatusList);
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
