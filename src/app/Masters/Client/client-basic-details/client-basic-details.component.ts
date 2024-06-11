import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Observable } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-client-basic-details',
  templateUrl: './client-basic-details.component.html',
  styleUrls: ['./client-basic-details.component.scss'],
})
export class ClientBasicDetailsComponent implements OnInit {
  countryCtrl: FormControl<any>;
  filteredCountry: Observable<unknown>;
  PostalCodeList = [];
  selectedCountry;
  form: FormGroup;
  inputData: any;
  checked = false;
  color: ThemePalette = 'accent';
  public title = 'New Customer';
  public isHidden = true;
  public countryList = [];
  public stateList = [];
  public cityList = [];
  public currencyArray = [];
  public languageArray = [];
  public postCodeArray = [];
  public custTypeList = [];

  constructor(
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private fb: FormBuilder,
    public createCustomerService: ClientService,
    public dialogRef: MatDialogRef<ClientBasicDetailsComponent>
  ) {
    this.form = this.fb.group({
      customerType: ['', Validators.required],
      companyName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: [''],
      customerMobile: ['',[Validators.required]],
      language: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      landmark: [''],
    });

    this.Reset();
  }
  ngOnInit(): void {
    this.getCustomerTypelist();
    this.getcountrylist();
    this.getLanguagelist();
  }

  SubmitForm() {
    this.form.markAllAsTouched();

    this.form.value.customerPhone = this.form.value.customerPhone?.toString();
    this.form.value.customerMobile = this.form.value.customerMobile?.toString();

    this.createCustomerService
      .createNewCustomer(this.form.value)
      .subscribe((p) => {
        if (p) {
          this.snackBarService.showSnackbarTopPosition(
            'Saved Successfully',
            'Success'
          );
          this.close();
          this.router.navigateByUrl(
            'masters/client-info?cid=' + p.data.id + ''
          );
        }
      }),
      (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error');
      };
  }

  Reset() {
    this.form.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  getCustomerTypelist() {
    this.createCustomerService.getCustomerTypeList().subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error');
      },
      next: (list: any) => {
        this.custTypeList = list.data;
      },
    });
  }
  getcountrylist() {
    this.createCustomerService.getCountry().subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error');
      },
      next: (list: any) => {
        this.countryList = list.data;
      },
    });
  }

  getLanguagelist() {
    this.createCustomerService.getLanguage().subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error');
      },
      next: (list: any) => {
        this.languageArray = list.data;
      },
    });
  }

  countrySelect(event) {debugger
    this.stateList = [];
    this.form.controls['state'].reset();
    this.form.controls['city'].reset();
    this.form.controls['postalCode'].reset();

    this.createCustomerService.getState(event.id).subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error');
      },
      next: (list: any) => {
        this.stateList = list.data;
      },
    });
  }

  stateSelect(event) {
    this.cityList = [];
    this.form.controls['city'].reset();
    this.form.controls['postalCode'].reset();

    this.createCustomerService.getCity(event.id).subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error');
      },
      next: (list: any) => {
        this.cityList = list.data;
      },
    });
  }

  citySelect(event) {
    this.PostalCodeList = [];
    this.form.controls['postalCode'].reset();
    
    this.createCustomerService.getPostCode(event.id).subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error');
      },
      next: (list: any) => {
        this.PostalCodeList = list.data;
      },
    });
  }
}
