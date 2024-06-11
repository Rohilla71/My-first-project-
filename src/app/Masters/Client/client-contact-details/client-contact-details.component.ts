import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../client.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ClientEditViewContactDetailsComponent } from '../client-edit-view-contact-details/client-edit-view-contact-details.component';

export interface ContactPersonListData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  phone: string;
}

@Component({
  selector: 'app-client-contact-details',
  templateUrl: './client-contact-details.component.html',
  styleUrl: './client-contact-details.component.scss'
})

export class ClientContactDetailsComponent {
  displayedColumns: string[] = ['id', 'salutation', 'firstName', 'lastName', 'addressLine1', 'addressLine2',
  'landmark', 'countryName', 'stateName', 'cityName',  'postalCode',
  'cEmail', 'cPhone', 'communicationType', 'isPrimary',   'actions'];
  isLoading = true;
  unitList = []
  @Input() cid;
  dataSource: MatTableDataSource<ContactPersonListData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ClientService, public dialog: MatDialog, private snackBar: SnackBarService) {}

  ngOnInit() {
    this.service.customerId = this.cid;
    this.getContactDetailsList()
    this.service.contactSubmitEvent.subscribe(p=> {
      this.getContactDetailsList()
    })
      }

      
  
  add(): void {

    const dialogRef = this.dialog.open(ClientEditViewContactDetailsComponent, {
      width: '800px',
      height:'600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContactDetailsList();
      console.log('The dialog was closed');
    });
  }

  edit(listdata: any): void {
    const dialogRef = this.dialog.open(ClientEditViewContactDetailsComponent, {
      data: { listdata },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContactDetailsList();
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

  // bind actual api in service after getting api
  getContactDetailsList() {
    this.service.getContactDetailsList(this.cid).subscribe({
      next: (list: any) => {
        this.isLoading = false;
        this.unitList = list?.data;
        this.bindTable(this.unitList);
      } 
    })

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
