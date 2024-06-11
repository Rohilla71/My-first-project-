import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ClientService } from '../client.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-client-edit-view-contact-details',
  templateUrl: './client-edit-view-contact-details.component.html',
  styleUrl: './client-edit-view-contact-details.component.scss'
})
export class ClientEditViewContactDetailsComponent implements OnInit {
  public cid: number;
  stateList = []
  cityList = []
  PostalCodeList = []
  countryList = []
  public title = 'Add Contact Details'
  form: FormGroup;
  CData: any;
  checked = false;
  //asl rahul sa;utation is ocrrect pr not
  salutationList = []
  commTypeList

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>,
  private fb: FormBuilder, private snackbar: SnackBarService, private service: ClientService) {

  }

  ngOnInit(): void {
    this.getSalutationList()
    this.getCommunicationList()
    this.getcountrylist()
    this.CData = this.data?.listdata;
    //ask rahul what is clientid and id
    if (!this.CData) {
      this.form = this.fb.group({
        id: 0,
        customerId: +this.service.customerId,
        salutationId: [null, Validators.required],
        firstName: ['', Validators.required],
        lastName: [''],
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        landmark: [''],
        countryId: ['', Validators.required],
        stateId: ['', Validators.required],
        cityId: ['', Validators.required],
        postalCodeId: ['', Validators.required],
        cEmail: ['', [Validators.required, Validators.email]],
        isPrimary: [true, Validators.required],
        cPhone: ['', Validators.required],
        communicationTypeId: [null]
      });
    }
    else {
      //ask what is client id and id
      this.title = 'Edit Contact Details'
      if (this.CData.countryId) {
        this.countrySelect({ value: this.CData.countryId })
      }
      if (this.CData.stateId) {
        this.stateSelect({ value: this.CData.stateId })
      }
      if (this.CData.cityId) {
        this.citySelect({ value: this.CData.cityId })
      }
      console.log("Edit")
      console.log(this.CData)
      this.form = this.fb.group({
        id: this.CData.id,
        customerId: this.CData.customerId,
        salutationId: [this.CData.salutationId, Validators.required],
        firstName: [this.CData.firstName, Validators.required],
        lastName: [this.CData.lastName],
        addressLine1: [this.CData.address1, Validators.required],
        addressLine2: [this.CData.address2],
        landmark: [this.CData.landmark],
        countryId: [this.CData.countryId, Validators.required],
        stateId: [this.CData.stateId, Validators.required],
        cityId: [this.CData.cityId, Validators.required],
        postalCodeId: [this.CData.postalCodeId, Validators.required],
        cEmail: [this.CData.cEmail, [Validators.required, Validators.email]],
        isPrimary: [this.CData.isPrimary, Validators.required],
        cPhone: [this.CData.cPhone, Validators.required],
        communicationTypeId: [this.CData.communicationTypeId]
      });
    }
  }

  SubmitForm() {
    console.log(this.form.value)
    // bind actual api when available ask rahul about ctreate contact api
      if (this.title = 'Add Contact Details') {
        this.service.createContact(this.form.value).subscribe(p => {
          if (p) {
           // this.service.contactSubmitEvent.next(true)
            this.snackbar.showSnackbarTopPosition('Saved Successfully', 'Dismiss')
            this.close();
          }
        }),
          error => {
            this.snackbar.showSnackbarTopPosition(error.message, 'Dismiss');
          }
      }
      else {
        this.service.updateContact(this.cid, this.form.value).subscribe(p => {
          if (p) {
            this.snackbar.showSnackbarTopPosition('Updated Successfully', 'Dismiss');
            this.close();
          }
        }),
          error => {
            this.snackbar.showSnackbarTopPosition(error.message, 'Dismiss');
          }
      }
  }
  
  
  close(): void {
    this.dialogRef.close();
  } 
  
  isactiveChange(val) {
    this.form.value.isPrimary = val?.checked;
  }

  getcountrylist() {
    this.service.getCountry().subscribe({
      error: (error) => {
        this.snackbar.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (list: any) => {
        this.countryList = list.data
      }
    })
  }

  countrySelect(event) {
    this.service.getState(event.value).subscribe({
      error: (error) => {
        this.snackbar.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (list: any) => {
        this.stateList = list.data
      }
    })
  }

  stateSelect(event) {
    this.service.getCity(event.value).subscribe({
      error: (error) => {
        this.snackbar.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (list: any) => {
        this.cityList = list.data
      }
    })
  }

  citySelect(event) {
    this.service.getPostCode(event.value).subscribe({
      error: (error) => {
        this.snackbar.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (list: any) => {
        this.PostalCodeList = list.data
      }
    })
  }
  //bind actual; api
  getSalutationList() {
    this.service.getSalutationList().subscribe({
      error: (error) => {
        this.snackbar.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (list: any) => {
        this.salutationList = list.data
      }
    })
  }
  //bind actual api
  getCommunicationList() {
    this.service.getCommunicationList().subscribe({
      error: (error) => {
        this.snackbar.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (list: any) => {
        this.commTypeList = list.data
      }
    })
  }
}
