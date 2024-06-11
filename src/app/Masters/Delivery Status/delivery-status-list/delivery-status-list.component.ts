import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DeliveryStatusCreateComponent } from '../delivery-status-create/delivery-status-create.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryStatusService } from '../delivery-status.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

export interface DeliveryStatusData {
  id: number;
  name: string;
  description: string;
  sequence: string;
  isActive: number;
  lastActionBy: boolean;
  lastActionOn: string;
}

@Component({
  selector: 'app-delivery-status-list',
  templateUrl: './delivery-status-list.component.html',
  styleUrls: ['./delivery-status-list.component.scss'],
})
export class DeliveryStatusListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'sequence',
    'lastActionBy',
    'lastActionOn',
    'isActive',
    'actions',
  ];

  isLoading = true;

  @ViewChild('input') input: ElementRef<any>;
  dataSource: MatTableDataSource<DeliveryStatusData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deliveryStatusService: DeliveryStatusService,
    public dialog: MatDialog,
    public snackBarService : SnackBarService
  ) {}

  ngOnInit(): void {
    this.GetDelieveryStatusList();
  }

  add(): void {
    const dialogRef = this.dialog.open(DeliveryStatusCreateComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.GetDelieveryStatusList();
      this.input.nativeElement.value = "";
    });
  }

  edit(country: any): void {
    const dialogRef = this.dialog.open(DeliveryStatusCreateComponent, {
      width: '800px',
      data: { country },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.GetDelieveryStatusList();
      this.input.nativeElement.value = "";
    });
  }

  GetDelieveryStatusList() {
    this.deliveryStatusService.GetDelieveryStatusList().subscribe((p) => {
      if (p.success == true) {
        this.isLoading = false;
        this.deliveryStatusService.DeliveryStatusList = p?.data;
        this.dataSource = new MatTableDataSource(
          this.deliveryStatusService.DeliveryStatusList
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.bindTable(this.deliveryStatusService.DeliveryStatusList);
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, "error");
        this.isLoading = false;
      };
  }

  bindTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
