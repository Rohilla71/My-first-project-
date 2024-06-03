import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../state.service';
import { State, StateList } from '../state.types';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StateCreateComponent } from '../state-create/state-create.component';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.scss',
})
export class StateListComponent implements OnInit {

  isLoading = true;
  stateList: StateList[] = [];
  dataSource: MatTableDataSource<StateList>;
  displayedColumns: string[] = [
    'id',
    'country',
    'name',
    'code',
    'gstCode',
    'isActive',
    'latitude',
    'longitude',
    'lastActionBy',
    'lastActionOn',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _stateService: StateService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllStateList();
  }

  getAllStateList(): void {
    this._stateService.GetAllStateList().subscribe((res) => {
      if (res.success) {
        
        this.isLoading = false;
        this.stateList = res.data;
        this.dataSource = new MatTableDataSource(this.stateList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.dataSource.filterPredicate = (data: StateList, filter: string) => {
        //   return (
        //     data.name.toLowerCase().includes(filter) ||
        //     data.code.toLowerCase().includes(filter) ||
        //     data.gstCode.toLowerCase().includes(filter) ||
        //     data.isActive.toString().toLowerCase().includes(filter) ||
        //     data.latitude.toString().toLowerCase().includes(filter) ||
        //     data.longitude.toString().toLowerCase().includes(filter) ||
        //     data.lastActionBy.toString().toLowerCase().includes(filter) ||
        //     data.lastActionOn.toString().toLowerCase().includes(filter)
        //   );
        // };
      }
    }),
    error=>{
      this.isLoading = false;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add(): void {
    const dialogRef = this.dialog.open(StateCreateComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllStateList();
    });
  }

  updateState(state: StateList): void {
    const dialogRef = this.dialog.open(StateCreateComponent, {
      width: '800px',
      data: { state },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllStateList();
    });
  }

  deleteState(stateId: number) {
    this._stateService.DeleteState(stateId).subscribe((res: any) => {
      console.log(res);
    });
  }
}
