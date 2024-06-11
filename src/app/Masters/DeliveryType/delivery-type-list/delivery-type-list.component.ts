import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeliveryTypeService } from '../delivery-type.service';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryTypeCreateComponent } from '../delivery-type-create/delivery-type-create.component';
import { DeliveryTypeList } from 'src/app/Interfaces/DeliveryType';

@Component({
  selector: 'app-delivery-type-list',
  templateUrl: './delivery-type-list.component.html',
  styleUrls: ['./delivery-type-list.component.scss'],
})
export class DeliveryTypeListComponent implements OnInit {
  isLoading: boolean = false;
  deliveryTypeList: DeliveryTypeList[] = [];
  dataSource: MatTableDataSource<DeliveryTypeList>;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'isActive',
    'lastActionBy',
    'lastActionOn',
    'actions',
  ];

  @ViewChild('input') input: ElementRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _deliveryTypeService: DeliveryTypeService,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllDelivertTypeList();
  }

  getAllDelivertTypeList() {
    this._deliveryTypeService.GetAllDeliveryList().subscribe((res: any) => {
      if (res.success) {
        this.isLoading = false;
        this.deliveryTypeList = res.data;
        this.dataSource = new MatTableDataSource(this.deliveryTypeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (
          data: DeliveryTypeList,
          filter: string
        ) => {
          return (
            data.name.toLowerCase().includes(filter) ||
            data.description.toLowerCase().includes(filter)
          );
        };
      }
    }),
      (error) => {
        this.isLoading = false;
      };
  }

  addDelivery() {
    const dialogRef = this._dialog.open(DeliveryTypeCreateComponent, {
      width: '800px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllDelivertTypeList();
      this.input.nativeElement.value = '';
    });
  }

  deleteDeliveryType(deliveryType: number) {
    this._deliveryTypeService
      .DeleteDeliveryType(deliveryType)
      .subscribe((res: any) => {});
  }

  updateDeliveryType(delivery: DeliveryTypeList) {
    const dialogRef = this._dialog.open(DeliveryTypeCreateComponent, {
      width: '800px',
      data: { delivery },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllDelivertTypeList();
      this.input.nativeElement.value = '';
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
