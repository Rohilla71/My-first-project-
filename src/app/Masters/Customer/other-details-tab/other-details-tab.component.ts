import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateCustomerService } from '../create-customer.service';

@Component({
  selector: 'app-other-details-tab',
  templateUrl: './other-details-tab.component.html',
  styleUrls: ['./other-details-tab.component.scss']
})
export class OtherDetailsTabComponent implements OnInit {

  form: FormGroup
  reqfiletype = 'image/png'
  fileName: string;
  public currencyArray = []
  public languageArray = []
  public taxPreferenceArray = []
  public taxTreatmentArray = []
  constructor(private fb: FormBuilder, private createCustomerService: CreateCustomerService ) {
    this.form = this.fb.group({
      displayName: ['', Validators.required],
      currencyId: [''],
      taxTreatmentId: [''],
      panno: ['', Validators.required],
      accountNo:['', Validators.required],
      accountReference: ['', Validators.required],
      termsConditions: [''],
      disclaimer: [''],
      taxPreferenceId: ['', Validators.required]
    });
    this.getTaxTreatment()
    this.getCurrencylist()
    this.getTaxPref()
    // edit mode
    // if () {
    //   this.otherDetailsTabData()
    // }
  }

  ngOnInit(): void {
    // if () {
    //   this.form.get('name').setValue()
    //   this.form.get('currency').setValue()
    //   this.form.get('langtaxPreferenceuage').setValue()
    //   this.form.get('pan').setValue()
    //   this.form.get('accNo').setValue()
    //   this.form.get('accRef').setValue()
    //   this.form.get('termsCondn').setValue()
    //   this.form.get('disclaimer').setValue()
    //   this.form.get('taxPreference').setValue()
    //   this.form.get('name').setValue()
    // }
  }
  fileUpload(event) {
    const file:File = event.target.files[0];
      
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
    }
  }

  SubmitForm() {
    // if (this.form.valid) {
    //     this.createCustomerService.createNewCustomer(this.form.value).subscribe(p => {
    //       if (p) {
    //         this.snackBar.open('Saved Successfully', 'Dismiss')
    //         this.close();
    //         this.router.navigate(['/other-details'])
    //       }
    //     }),
    //       error => {
    //         this.snackBar.open(error.message, 'Dismiss');
    //       }
    // }
    // else {
    //   this.form.markAllAsTouched();
    // }
  }
  
  Reset() {
    this.form.reset();
  }
  

  getTaxTreatment() {
    this.createCustomerService.getTaxTreatment().subscribe((list: any) => {
      this.taxTreatmentArray = list.data
    },
      (error: any) => {
        throw error
      })
  }
  
  getCurrencylist() {
    this.createCustomerService.getCurrency().subscribe((list: any) => {
      this.currencyArray = list.data
    },
      (error: any) => {
        throw error
      })
  }
  
  getTaxPref() {
    this.createCustomerService.getTaxPreference().subscribe((list: any) => {
      this.taxPreferenceArray = list.data
    },
      (error: any) => {
        throw error
      })
  }
}
