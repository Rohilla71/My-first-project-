import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityService } from '../city.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../../Country/country.service';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrl: './city-create.component.scss'
})
export class CityCreateComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  nationality: any;
  form: FormGroup;
  CData: any;
  selectedCountry;
  selectedState;

  constructor(
    public dialogRef: MatDialogRef<CityCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public service: CityService,
    public service2: CountryService,
    private toastr: ToastrService) {
    debugger
    this.CData = data?.city;
    this.GetCountryList()

    if (!this.CData) {
      this.form = this.fb.group({
        id: 0,
        name: ['', Validators.required],
        countryId: [0],
        stateId: [0, Validators.required],
        isActive: ['', Validators.required],
        latitude: [''],
        longitude: [''],
        createdBy: [0],
        updatedBy: [0],
      });
    }
    else {
      this.selectedState = this.CData.state.id;
      this.countryBind(this.CData.state.id);
      this.form = this.fb.group({
        id: this.CData.id,
        name: [this.CData.name],
        countryId: [0],
        stateId: [this.CData.state.id],
        isActive: [this.CData.isActive],
        latitude: [this.CData.latitude],
        longitude: [this.CData.longitude],
        createdBy: [this.CData.createdBy],
        updatedBy: [0],
      });
    }



  }

  SubmitForm() {
    debugger
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.service.CreateCity(this.form.value).subscribe(p => {
          debugger
          if (p) {
            this.toastr.success('City Saved Successfully');
            this.close();
          }
        }),
          error => {
            this.toastr.success(error);
          }
      }
      else {
        this.service.UpdateCity(this.form.value.id, this.form.value).subscribe(p => {
          debugger
          if (p) {
            this.toastr.success('City Updated Successfully');
            this.close();
          }
        }),
          error => {
            this.toastr.success(error);
          }
      }
    }
    else {
      this.toastr.error('Form Invalid');
      this.form.markAllAsTouched();

    }
  }

  isactiveChange(val) {
    debugger
    this.form.value.isActive = val?.checked;
  }

  Reset() {
    this.form.reset();
  }

  close(): void {
    this.dialogRef.close();
  }


  GetCountryList() {
    debugger
    this.service2.GetCountryList().subscribe(p => {
      debugger
      if (p.success == true) {
        this.service2.countries = p?.data;
      }
    }),
      error => {
        debugger;
        console.log(error);
      }

  }

  countryChange(id: any) {
    debugger;
    this.service.GetStateByCountryId(id).subscribe(p => {
      debugger
      if (p.success == true) {
        this.service.states = p?.data;
      }
    }),
      error => {
        debugger;
        console.log(error);
      }
  }

  countryBind(id: any) {
    debugger;
    this.service.GetCountryByStateId(id).subscribe(p => {
      debugger
      if (p.success == true) {
        this.selectedCountry = p.data.id;
        this.form.value.countryId = p.data.id;
        this.countryChange(p.data.id);
       
        //this.service.states = p?.data;
      }
    }),
      error => {
        debugger;
        console.log(error);
      }
  }

  stateChange(id: any) {
    debugger;
    this.form.value.stateId = id;
  }
}
