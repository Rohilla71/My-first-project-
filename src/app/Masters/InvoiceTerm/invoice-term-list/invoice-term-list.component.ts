import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { invoiceTermList } from 'src/app/Interfaces/InvoiceTerm';
import { InvoiceTermService } from '../invoice-term.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceTermCreateComponent } from '../invoice-term-create/invoice-term-create.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { error } from 'jquery';

@Component({
  selector: 'app-invoice-term-list',
  templateUrl: './invoice-term-list.component.html',
  styleUrls: ['./invoice-term-list.component.scss'],
})
export class InvoiceTermListComponent implements OnInit {
  isLoading: boolean = true;
  invoiceTermList: invoiceTermList[] = [];
  dataSource: MatTableDataSource<invoiceTermList>;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'isactive',
    'lastActionBy',
    'lastActionOn',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _invioceTermService: InvoiceTermService,
    private _snackBarService: SnackBarService,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllInvoiceTermList();
  }

  getAllInvoiceTermList() {
    this._invioceTermService.GetAllInvoiceTermList().subscribe((res: any) => {
      if (res.success) {
        this.isLoading = false;
        this.invoiceTermList = res.data;
        this.dataSource = new MatTableDataSource(this.invoiceTermList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (
          data: invoiceTermList,
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
        this._snackBarService.openSnackbar(error.message, 'Close');
      };
  }

  addInvoiceTerm() {
    const dialogRef = this._dialog.open(InvoiceTermCreateComponent, {
      width: '800px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllInvoiceTermList();
    });
  }

  deleteInvoiceTerm(invoiceId: number) {
    this._invioceTermService
      .DeleteInvoiceTerm(invoiceId)
      .subscribe((res: any) => {
        this._snackBarService.openSnackbar(
          'Invoice deleted successfully!',
          'close'
        );
      }),
      (error) => {
        this._snackBarService.openSnackbar(error.message, 'Close');
      };
  }

  updateInvoiceTerm(invoiceDate: invoiceTermList) {
    const dialogRef = this._dialog.open(InvoiceTermCreateComponent, {
      width: '800px',
      data: { invoiceDate },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllInvoiceTermList();
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
