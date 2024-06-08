import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from 'src/app/tables/sorting-table/sorting-table.component';
import { ClientService } from '../client.service';
import { ClientListResponse, Datum } from 'src/app/Interfaces/ClientList';
import { MatDialog } from '@angular/material/dialog';
import { ClientBasicDetailsComponent } from '../client-basic-details/client-basic-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})



export class ClientListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'customerType', 'displayName', 'name', 'email', 'phone', 'mobile', 'currency', 'logo',
    'textTreatment', 'panno', 'language', 'taxPreference', 'country', 'state', 'city', 'postalCode', 'address1', 'address2',
    'accountNo', 'accountReference', 'termsConditions', 'disclaimer', 'landMark', 'lastActionBy', 'lastActionOn','actions'
  ];
  dataSource: MatTableDataSource<Datum>;
  isLoading = true;
  unitList = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clientService: ClientService, public dialog: MatDialog,  
    private snackBar: SnackBarService,
    private router: Router) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    
  }
  ngOnInit(): void {
    this.clientService.getClients().subscribe((resp:ClientListResponse)=>{
      if (resp.success == true) {
        this.isLoading = false;
        this.unitList = resp?.data;
        this.bindTable(this.unitList);
      }
    }),
      error => {
        this.isLoading = false;
        this.snackBar.showSnackbarTopPosition(error.message, 'Error') 
        console.log(error);
      }
  }

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

  bindTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  add(): void {
    const dialogRef = this.dialog.open(ClientBasicDetailsComponent, {
      width: '800px',
      height:'600px',
      disableClose: true
      //  /data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.GetCityList();
      console.log('The dialog was closed');
    });
  }

  edit(data: any): void {
    this.router.navigateByUrl('masters/client-info?cid=' + data.id + '');
     console.log(data)
  }
}







