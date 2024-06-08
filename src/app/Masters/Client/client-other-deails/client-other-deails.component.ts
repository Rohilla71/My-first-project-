import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { Editor } from 'ngx-editor';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-other-deails',
  templateUrl: './client-other-deails.component.html',
  styleUrls: ['./client-other-deails.component.scss']
})
export class ClientOtherDeailsComponent implements OnInit {

  @Input() cid: number

  form: FormGroup
  baseUrl = environment.ImgUrl;
  userImage;
  reqfiletype = 'image/png'
  fileName: string;
  public currencyArray = []
  public languageArray = []
  public taxPreferenceArray = []
  public taxTreatmentArray = []
  editor: Editor;
  disclaimereditor: Editor;
  logoImage: null;
  base64string: any;
  isLogoPath: boolean = false;
  constructor(private fb: FormBuilder, private createCustomerService: ClientService, private snackBarService: SnackBarService) {
    this.form = this.fb.group({
      id: [],
      displayName: ['', Validators.required],
      currencyId: [''],
      taxTreatmentId: [''],
      logopath: [null],
      //File:[null],
      panno: ['', Validators.required],
      accountNo: ['', Validators.required],
      accountReference: ['', Validators.required],
      termsConditions: [''],
      disclaimer: [''],
      taxPreferenceId: ['', Validators.required]
    });



  }

  async ngOnInit(): Promise<void> {
    this.editor = new Editor();
    this.disclaimereditor = new Editor();
    await this.getTaxTreatment()
    this.getCurrencylist()
    this.getTaxPref()
    this.otherDetailsTabData(this.cid)
  }



  otherDetailsTabData(customerId) {
    this.createCustomerService.getotherdetailstab(customerId).subscribe((list: any) => {

      this.form.setValue(list.data)
      if (list.data.logopath) {
        this.userImage = list.data.logopath
        this.isLogoPath = true
      }
    },
      (error: any) => {
        throw error
      })
  }
  fileUpload(event) {

   this.logoImage=event.target.files[0]
    this.form.patchValue({ File: event.target.files[0]});
    // const file: File = event.target.files[0];
    // const reader = new FileReader()
    // reader.onloadend = () => {
    //   this.base64string = reader.result as string;
    //   console.log('image', this.base64string)
    // }
    // if (file) {
    //   this.fileName = file.name;
    //   reader.readAsDataURL(file)
    // }
  }

  SubmitForm() {
    //this.form.get('logopath').setValue(this.logoImage)
    // if (this.form.valid) {

    let formData: any = new FormData();        
    Object.keys(this.form.controls).forEach(formControlName => { 
      formData.append(formControlName,  this.form.get(formControlName).value);    
    }); 
    formData.append("File",  this.logoImage); 
    
    this.createCustomerService.UpdateOtherDetails(formData, this.cid).subscribe(p => {
      if (p) {
        this.snackBarService.showSnackbarTopPosition('Saved Successfully', 'Dismiss')
        // @rahul-ask where to navigate after submit
        // this.close();  
        //  this.router.navigate(['/other-details'])
      }
    }),
      error => {
        this.snackBarService.showSnackbarTopPosition(error.message, 'Error')
      }
    // }
    // else {
    //   this.form.markAllAsTouched();
    // }
  }

  Reset() {
    this.form.reset();
  }

  // @rahul ask- no api avail
  async getTaxTreatment() {
    await this.createCustomerService.getTaxTreatment().subscribe((list: any) => {
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

  // @rahul ask- no api avail
  getTaxPref() {
    this.createCustomerService.getTaxPreference().subscribe((list: any) => {
      this.taxPreferenceArray = list.data
    },
      (error: any) => {
        throw error
      })
  }
}
