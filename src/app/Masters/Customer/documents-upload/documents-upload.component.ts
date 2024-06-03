import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUnitListComponent } from 'src/app/dashboard/create-unit-list/create-unit-list.component';
import { UnitListService } from 'src/app/dashboard/unit-list.service';
import { UnitListData } from 'src/app/dashboard/unit-list/unit-list.component';
import { CreateCustomerService } from '../create-customer.service';


export interface TableData {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  lastActionBy: string;
  lastActionOn: string;
}
@Component({
  selector: 'app-documents-upload',
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.scss']
})
export class DocumentsUploadComponent implements OnInit {
  fileName: string
  displayedColumns: string[] = ['fileName', 'fileDescription', 'filePath'];
  isLoading = true;
  dataList = []
  dataSource: MatTableDataSource<TableData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: CreateCustomerService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    //call api yo fetch file details in table
     this.getFileUploadDetails()
      }
    
      
      add(): void {
    
       
        // const dialogRef = this.dialog.open(CreateUnitListComponent, {
        //   width: '800px',
        //   disableClose: true
        // });
    
        // dialogRef.afterClosed().subscribe(resultJSON => {
        //   this.getUnitList();
        //   console.log('The dialog was closed');
        // });
      }
  
      getFileUploadDetails() {
        this.service.getFileUploadDetails().subscribe((p: any) => {
         // if (p.success == true) {
            this.isLoading = false;
            this.dataList = [
              {
                fileName: 'file.doc',
                fileDescription: 'File contains test data',
                filePath: ''
              },
              {
                fileName: 'file.doc',
                fileDescription: 'File contains test data',
                filePath: ''
              }
            ]
            // this.dataList = p?.data;   need to revert when bind api
            this.bindTable(this.dataList);
         // }
        }),
          error => {
            this.isLoading = false;
            this.snackBar.open(error.message, 'Dismiss');
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

      fileUpload(event) {
        const file:File = event.target.files[0];
          
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("thumbnail", file);
        }
      }

}
