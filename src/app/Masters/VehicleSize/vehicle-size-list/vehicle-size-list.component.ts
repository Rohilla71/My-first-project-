import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleSizeList } from 'src/app/Interfaces/VehicleSize';
import { VehicleSizeService } from '../vehicle-size.service';
import { MatDialog } from '@angular/material/dialog';
import { VehicleSizeCreateComponent } from '../vehicle-size-create/vehicle-size-create.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-vehicle-size-list',
  templateUrl: './vehicle-size-list.component.html',
  styleUrls: ['./vehicle-size-list.component.scss'],
})
export class VehicleSizeListComponent {
  isLoading: boolean = true;
  vehicleSizeList: VehicleSizeList[] = [];
  dataSource: MatTableDataSource<VehicleSizeList>;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'sizeInSqft',
    'height',
    'width',
    'length',
    'isActive',
    'lastActionBy',
    'lastActionOn',
    'actions',
  ];

  @ViewChild('input') input: ElementRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _vehicleSizeService: VehicleSizeService,
    public _dialog: MatDialog,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.getAllVehicleSizeList();
  }

  getAllVehicleSizeList() {
    this._vehicleSizeService.GetAllVehicleSizeList().subscribe((res: any) => {
      if (res.success) {
        this.isLoading = false;
        this.vehicleSizeList = res.data;
        this.dataSource = new MatTableDataSource(this.vehicleSizeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (
          data: VehicleSizeList,
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
        this._snackBarService.openSnackbar(error.message, 'close');
      };
  }

  addVehicleSize() {
    const dialogRef = this._dialog.open(VehicleSizeCreateComponent, {
      width: '800px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllVehicleSizeList();
      this.input.nativeElement.value = "";
    });
  }

  updateVehicleSize(vehicleSize: VehicleSizeList) {
    const dialogRef = this._dialog.open(VehicleSizeCreateComponent, {
      width: '800px',
      data: { vehicleSize },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllVehicleSizeList();
      this.input.nativeElement.value = "";
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
