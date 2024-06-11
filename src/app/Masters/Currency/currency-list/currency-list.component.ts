import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrencyCreateComponent } from '../currency-create/currency-create.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CurrencyService } from '../currency.service';
import { currencyList } from 'src/app/Interfaces/Currency';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  isLoading: boolean = true;
  currencyList: currencyList[] = [];
  dataSource: MatTableDataSource<currencyList>;
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'symbol',
    'isActive',
    'lastActionBy',
    'lastActionOn',
    'actions',
  ];

  @ViewChild('input') input: ElementRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    private _currencyService: CurrencyService,
    private _snackBarService: SnackBarService
  ) {}
  ngOnInit(): void {
    this.getAllCurrencyList();
  }

  getAllCurrencyList() {
    this._currencyService.GetAllCurrencyList().subscribe((res) => {
      if (res.success) {
        this.isLoading = false;
        this.currencyList = res.data;
        this.dataSource = new MatTableDataSource(this.currencyList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (
          data: currencyList,
          filter: string
        ) => {
          return (
            data.name.toLowerCase().includes(filter) ||
            data.code.toLowerCase().includes(filter) ||
            data.symbol.toLowerCase().includes(filter) ||
            data.isActive.toString().toLowerCase().includes(filter) ||
            data.lastActionBy.toString().toLowerCase().includes(filter) ||
            data.lastActionOn.toString().toLowerCase().includes(filter)
          );
        };
      }
    }),
      (error) => {
        this.isLoading = false;
        this._snackBarService.openSnackbar(error.message, 'Close')
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
    const dialogRef = this.dialog.open(CurrencyCreateComponent, {
      width: '800px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCurrencyList();
      this.input.nativeElement.value = "";
    });
  }

  updateCurrency(currency: currencyList): void {
    const dialogRef = this.dialog.open(CurrencyCreateComponent, {
      width: '800px',
      data: { currency },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCurrencyList();
      this.input.nativeElement.value = "";
    });
  }

  deleteState(stateId: number) {
    this._currencyService.DeleteCurrency(stateId).subscribe((res: any) => {
    });
  }
}
