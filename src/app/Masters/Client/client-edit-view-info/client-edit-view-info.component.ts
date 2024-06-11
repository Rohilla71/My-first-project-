import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClientService } from '../client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-client-edit-view-info',
  templateUrl: './client-edit-view-info.component.html',
  styleUrls: ['./client-edit-view-info.component.scss']
})
export class ClientEditViewInfoComponent implements OnInit {


  public customerID: number = 0;
  customerType: string = '';
  compName: string = '';
  postalCode: string = '';
  address1: string = '';
  address2: string = '';
  landmark: string = '';
  country: string = ''
  selectedcontId

  state: string = '';
  city: string = '';
  custPhone: string = ''
  custMobile: string = '';
  lang: string = '';
  custEmail: string = "";
  isEditable = false
  disabled = true;
  countryList = []
  stateList = []
  cityList = []
  PostalCodeList = []
  languageArray = []
  basicDetails: any = {}
  public custTypeList= []
  form: FormGroup = this.fb.group({
    customerType: [{ value: '', disabled: true }, Validators.required],
    name: ['', Validators.required],
    email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    phone: [''],
    mobile: ['', Validators.required],
    language: [''],
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    postalCodeId: ['', Validators.required],
    address1: ['', Validators.required],
    address2: [''],
    landMark: ['']
  });

  constructor(private fb: FormBuilder, private service: ClientService,
    private router: Router, private route: ActivatedRoute, private snackBarService: SnackBarService
  ) {

  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      this.customerID = params['cid'];
      await this.getCustomerTypelist();
      await this.getcountrylist()
      await this.getLanguagelist()
      this.getBasicDetails(this.customerID)

    });
  }

  async getCustomerTypelist() {
    this.service.getCustomerTypeList().subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (list: any) => {
        this.custTypeList = list.data
      }
    })
  }
  async getBasicDetails(cid) {

    this.service.getBasicDetails(cid)
      .subscribe({
        error: (error) => {
          this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
       },
        next: async (res: any) => {
          
        
        
          
          this.basicDetails = res.data

          var countryId = this.basicDetails.countryId
          var stateID = this.basicDetails.stateId
          var cityId = this.basicDetails.cityId
          if (countryId > 0)
            await this.getStateList(countryId)

          if (stateID > 0) {
            await this.getCityList(stateID)
          }
          if (cityId > 0) {
            await this.getPostalCodeList(cityId)
          }

          this.customerType = this.basicDetails.customerType;
          this.compName = this.basicDetails.name;
          this.postalCode = this.basicDetails.postalCode;
          this.address1 = this.basicDetails.address1;
          this.address2 = this.basicDetails.address2;
          this.landmark = this.basicDetails.landMark;
          this.country = this.basicDetails.country;
          this.state = this.basicDetails.state;
          this.city = this.basicDetails.city;
          this.custPhone = this.basicDetails.phone;
          this.custMobile = this.basicDetails.mobile;
          this.lang = this.basicDetails.language;
          this.custEmail = this.basicDetails.email;

          const formData = {
            customerType: this.basicDetails.customerTypeId,
            name: this.basicDetails.name,
            address1: this.basicDetails.address1,
            address2: this.basicDetails.address2,
            landMark: this.basicDetails.landMark,
            // country: this.basicDetails.country,
            country: this.basicDetails.countryId,
            state: this.basicDetails.stateId,
            city: this.basicDetails.cityId,
            postalCodeId:this.basicDetails.postalCodeId,
            phone: this.basicDetails.phone,
            mobile: this.basicDetails.mobile,
            language: this.basicDetails.languageId,
            email: this.basicDetails.email

          }
          this.form.setValue(formData)
        }

      })
  }
  EditBasicDetails() {
    this.isEditable = true

  }
  cancel() {
    this.isEditable = false
  }
  async getcountrylist() {
    await this.service.getCountry()
      .subscribe({
        complete: () => { },
        error: (error) => {
           this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
        },
        next: (resp: any) => {
          this.countryList = resp.data
        },     // nextHandler
      });

  }

  async getStateList(countryId) {
    await this.service.getState(countryId)
      .subscribe({
        complete: () => { },
        error: (error) => {
          this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
       },
        next: (resp: any) => {
          this.stateList = resp.data
        },     // nextHandler
      });

  }

  async getCityList(stateId) {
    await this.service.getCity(stateId)
      .subscribe({
        complete: () => { },
        error: (error) => {
          this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
       },
        next: (resp: any) => {
          this.cityList = resp.data
        },     // nextHandler
      });

  }

  async getPostalCodeList(cityId) {
    await this.service.getPostCode(cityId)
      .subscribe({
        complete: () => { },
        error: (error) => {
          this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
       },
        next: (resp: any) => {
          this.PostalCodeList = resp.data
        },     // nextHandler
      });

  }

  async getLanguagelist() {
    await this.service.getLanguage().subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (res: any) => {
        this.languageArray = res.data
      }
    })
  }

  onCountrySelect(event) {
    this.service.getState(event.value).subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (res: any) => {
        this.stateList = res.data
      }
    })
  }

  stateSelect(event) {
    this.service.getCity(event.value).subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (res: any) => {
        this.cityList = res.data
      }
    })
  }
  SubmitForm() {
    const data = {
      "id": +this.customerID,
      "customerType": this.form.controls['customerType'].value,
      "name": this.form.value.name,
      "email": this.form.controls['email'].value,
      "phone": this.form.value.phone,
      "mobile": this.form.value.mobile,
      "languageId": this.form.value.language,
      "address1": this.form.value.address1,
      "address2": this.form.value.address2,
      "countryId": this.form.value.country,
      "stateId": this.form.value.state,
      "cityId": this.form.value.city,
      "postalCodeId": this.form.value.postalCodeId,
      "landMark": this.form.value.landMark
    }
    this.service.updateBasicDetails(this.customerID, data).subscribe({
      error: (error) => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error') 
     },
      next: (res: any) => {
        this.snackBarService.showSnackbarTopPosition('Saved Successfully', 'Success') 
        this.getBasicDetails(this.customerID)
      }
    })
  }
}