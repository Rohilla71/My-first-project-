import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../client.service';

export interface TableData {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  lastActionBy: string;
  lastActionOn: string;
}

@Component({
  selector: 'app-client-document-upload',
  templateUrl: './client-document-upload.component.html',
  styleUrls: ['./client-document-upload.component.scss']
})
export class ClientDocumentUploadComponent implements OnInit {
  fileName: string
  @Input() cid: number
  displayedColumns: string[] = ['name', 'description', 'docPath'];
  isLoading = true;
  dataList = []
  description
  dataSource: MatTableDataSource<TableData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  base64string: any;
  constructor(private service: ClientService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    //call api yo fetch file details in table
     this.getFileUploadDetailsList()
      }
    
   
      upload(): void {
        const data = {
          file: this.base64string,
          fileName: this.fileName,
          description: this.description,
          clientId: this.cid
        }
   // write api to submit the file details 
   this.service.upload(data).subscribe((p: any) => {
    if (p.success == true) {
       this.isLoading = false;
       this.snackBar.open('Saved Successfully', 'Success');
       this.getFileUploadDetailsList()
     }
   }),
     error => {
       this.isLoading = false;
       this.snackBar.open(error.message, 'Dismiss');
       console.log(error);
     }

        
      }
  

      fileUpload(event) {
        const file:File = event.target.files[0];
          const reader = new FileReader()
          reader.onloadend = () => {
             this.base64string = reader.result as string;
            console.log('image', this.base64string)
          }
        if (file) {
            this.fileName = file.name;
            reader.readAsDataURL(file)
        }
      }

      getFileUploadDetailsList() {
        // @rahul revert when api available
        // this.service.getFileUploadListDetails(this.cid).subscribe((p: any) => {
        //  if (p.success == true) {
        //     this.isLoading = false;
        //     // this.dataList = p.documents  //need to revert once api avail
        //     this.dataList = [
        //       {
        //         fileName: 'file.doc',
        //         description: 'File contains test data',
        //         file: 'https://picsum.photos/200/300'
        //       },
        //       {
        //         fileName: 'file2.doc',
        //       description: 'File contains test data 2',
        //         file: 'https://picsum.photos/200/300'
        //       }
        //     ]
        //     this.bindTable(this.dataList);
        //   }
        // }),
        //   error => {
        //     this.isLoading = false;
        //     this.snackBar.open(error.message, 'Dismiss');
        //     console.log(error);
        //   }
        this.isLoading = false
        this.dataList = [
          {
            name: 'file.doc',
            description: 'File contains test data',
            docPath: 'https://picsum.photos/200/300'
          },
          {
            name: 'file2.doc',
          description: 'File contains test data 2',
            docPath: 'https://picsum.photos/200/300'
          }
        ]
        this.bindTable(this.dataList);
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
