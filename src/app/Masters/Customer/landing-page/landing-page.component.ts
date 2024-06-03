import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  customerType: string = 'Customer';
  compName: string = 'Furdeco';
  postalCode: string = '122001';
  address1: string = 'New York, USA';
  address2: string = 'New York, USA';
  landmark: string = 'Landmark';
  country: string = 'USA'
  state: string = 'New York';
  city: string = 'New York';
  custPhone: string = '1234567890'
  custMobile: string = '1234567890';
  lang: string = 'English';
  custEmail: string = "abc@gmail.com";
  isEditable = false
  disabled = true;
  public custType = [ {name: 'Business', id: 'Business'}, {name: 'Individual', id:'Individual'}]
  form : FormGroup = this.fb.group({
        customerType: ['', Validators.required],
        companyName: ['', Validators.required],
        customerEmail: [{value: '', disabled: true}],
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
  constructor(private fb: FormBuilder) {
    this.getOtherDeatils()
  }

  getOtherDeatils() {
// add basic details form bind
  }

  EditBasicDetails() {
    this.isEditable = true
  }

}
