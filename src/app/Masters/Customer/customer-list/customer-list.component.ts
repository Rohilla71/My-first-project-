import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  constructor(private dialog: MatDialog) {

  }

  add(): void {

    const dialogRef = this.dialog.open(CreateCustomerComponent, {
      width: '800px',
      height: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.getUnitList();
      console.log('The dialog was closed');
    });

}
}
