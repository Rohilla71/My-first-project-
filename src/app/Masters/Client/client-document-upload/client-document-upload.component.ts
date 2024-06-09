import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../client.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

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
  dataList = [];
  public description = "";
  dataSource: MatTableDataSource<TableData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  base64string: any;
  inputFile: any
  constructor(private service: ClientService, public dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit() {
    //call api yo fetch file details in table
    this.getFileUploadDetailsList()
  }


  upload(): void {
    // write api to submit the file details 
    this.isLoading = true;
    let formData: any = new FormData();
    formData.append("File", this.inputFile);
    formData.append("fileName", this.fileName);
    formData.append("description", this.description);
    formData.append("clientId", this.cid);
    this.service.upload(formData).subscribe((p: any) => {
      // if (p.success == true) {
      this.isLoading = false;
      this.snackBarService.showSnackbarTopPosition('Saved Successfully', 'Success');
      this.getFileUploadDetailsList()
      //  }
    }),
      error => {
        this.isLoading = false;
        this.snackBarService.showSnackbarTopPosition(error.message, 'Dismiss');
        console.log(error);
      }


  }


  fileUpload(event) {
    const file: File = event.target.files[0];
    this.inputFile = file
    if (file) {
      this.fileName = file.name;
    }
  }

  getFileUploadDetailsList() {
    // @rahul revert when api available
    this.service.getFileUploadListDetails(this.cid).subscribe((p: any) => {
      //  if (p.success == true) {
      this.isLoading = false;
      this.dataList = p.documents  //need to revert once api avail
      console.log(this.dataList)
      this.bindTable(this.dataList);
      // }
    }),
      error => {
        this.isLoading = false;
        this.snackBarService.showSnackbarTopPosition(error.message, 'Dismiss');
        console.log(error);
      }
    this.isLoading = false

  }

  bindTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //endregion

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
