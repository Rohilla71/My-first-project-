import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from '../country.service';
import { ToastrService } from 'ngx-toastr';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrl: './country-create.component.scss'
})
export class CountryCreateComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  nationality: any;
  form: FormGroup;
  CData: any;
  selectedCurrency;

  constructor(
    public dialogRef: MatDialogRef<CountryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public confService: CountryService,
    private toastr: ToastrService) {
    debugger
    this.CData = data?.country;

    if (!this.CData) {
      this.form = this.fb.group({
        id: 0,
        name: ['', Validators.required],
        code: ['', Validators.required],
        callingCode: ['', Validators.required],
        currencyId: ['', Validators.required],
        isActive: [true],
        capital: [''],
        latitude: ['', Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')],
        longitude: ['', Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')],
        timeZone: [''],
        flagEmoji: [''],
        nationality: [''],
        createdBy: [0],
        updatedBy: [0],
        lastActionBy: [''],
        lastActionOn: ['']
      });
    }
    else {
      this.selectedCurrency = this.CData.currencyId;
      this.form = this.fb.group({
        id: this.CData.id,
        name: [this.CData.name, Validators.required],
        code: [this.CData.code, Validators.required],
        callingCode: [this.CData.callingCode, Validators.required],
        currencyId: [this.CData.currencyId, Validators.required],
        isActive: [this.CData.isActive],
        capital: [this.CData.capital],
        latitude: [this.CData.latitude, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')],
        longitude: [this.CData.longitude, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')],
        timeZone: [this.CData.timeZone],
        flagEmoji: [this.CData.flagEmoji],
        nationality: [this.CData.nationality],
        createdBy: [this.CData.createdBy],
        updatedBy: [0],
        lastActionBy: [this.CData.lastActionBy],
        lastActionOn: [this.CData.lastActionOn]
      });
    }

    this.GetCurrencyList();

  }

  SubmitForm() {
    debugger
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.confService.CreateCountry(this.form.value).subscribe(p => {
          if (p) {
            this.toastr.success('Country Saved Successfully');
            this.close();
          }
        }),
          error => {
            this.toastr.success(error);
          }
      }
      else {
        this.confService.UpdateCountry(this.form.value.id, this.form.value).subscribe(p => {
          if (p) {
            this.toastr.success('Country Updated Successfully');
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

  GetCurrencyList() {
    debugger
    this.confService.GetCurrencyList().subscribe(p => {
      debugger
      if (p.success == true) {
        this.confService.currency = p?.data;
      }
    }),
      error => {
        debugger;
        console.log(error);
      }

  }

  currencyChange(id: any) {
    debugger
    this.form.value.currencyId = id;
  }

  Reset() {
    this.form.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  isactiveChange(val) {
    debugger
    this.form.value.isActive = val?.checked;
  }
}
