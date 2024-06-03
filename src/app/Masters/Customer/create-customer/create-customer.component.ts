import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateCustomerService } from 'src/app/Masters/Customer/create-customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {
  form: FormGroup;
  inputData: any;
  checked = false;
  color: ThemePalette = 'accent';
  public title = 'New Customer';
  public isHidden = true
  public countryList = []
  public stateList = []
  public cityList = []
  public currencyArray = []
  public languageArray = []
  public postCodeArray = []
  public custType = [ {name: 'Business', value: 'Business'}, {name: 'Individual', value: 'Individual'}]



constructor(public dialogRef: MatDialogRef<CreateCustomerComponent>, private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
  private fb: FormBuilder,
  public createCustomerService: CreateCustomerService) {
      this.form = this.fb.group({
        customerType: ['', Validators.required],
        companyName: ['', Validators.required],
        customerEmail: ['', Validators.required],
        customerPhone: [''],
        customerMobile: ['', Validators.required],
        language: [''],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        landmark: ['']
      });
  
    this.getcountrylist()
    this.getLanguagelist()
}

SubmitForm() {
  if (this.form.valid) {
      this.createCustomerService.createNewCustomer(this.form.value).subscribe(p => {
        if (p) {
          this.snackBar.open('Saved Successfully', 'Dismiss')
          this.close();
          this.router.navigate(['/other-details'])
        }
      }),
        error => {
          this.snackBar.open(error.message, 'Dismiss');
        }
  }
  else {
    this.form.markAllAsTouched();
  }
}

Reset() {
  this.form.reset();
}

close(): void {
  this.dialogRef.close();
}

getcountrylist() {
  this.createCustomerService.getCountry().subscribe((list: any) => {
    this.countryList = list.data
  },
    (error: any) => {
      throw error
    })
}


getLanguagelist() {
  this.createCustomerService.getCountry().subscribe((list: any) => {
    this.countryList = list.data
  },
    (error: any) => {
      throw error
    })
}

countrySelect(event) {
  this.form.get('stateId').enable()
  this.createCustomerService.getState(event.value.id).subscribe((list: any) => {
    this.stateList = list.data
  },
    (error: any) => {
      throw error
    })
}

stateSelect(event) {
  this.form.get('cityId').enable()
  this.createCustomerService.getCity(event.value.id).subscribe((list: any) => {
    this.cityList = list.data
  },
    (error: any) => {
      throw error
    })
}
}
