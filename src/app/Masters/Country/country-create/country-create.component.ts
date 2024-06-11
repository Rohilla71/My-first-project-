import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from '../country.service';
import { ThemePalette } from '@angular/material/core';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrl: './country-create.component.scss',
})
export class CountryCreateComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  nationality: any;
  form: FormGroup;
  CData: any;

  constructor(
    public dialogRef: MatDialogRef<CountryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public confService: CountryService,
    public snackBarService: SnackBarService
  ) {
    this.GetCurrencyList();

    this.CData = data?.country;
    if (!this.CData) {
      this.form = this.fb.group({
        id: [0],
        name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z ]*$'),
          ]),
        ],
        code: ['', [Validators.required, Validators.maxLength(5)]],
        callingCode: [
          '',
          [Validators.required, Validators.pattern('^[0-9]+$')],
        ],
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
        lastActionOn: [''],
      });

      this.Reset();
      this.form.controls['id'].setValue(0);
      this.form.controls['createdBy'].setValue(0);
      this.form.controls['updatedBy'].setValue(0);
    } else {
      this.form = this.fb.group({
        id: this.CData.id,
        name: [
          this.CData.name,
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z ]*$'),
          ]),
        ],
        code: [this.CData.code, Validators.required],
        callingCode: [this.CData.callingCode, Validators.required],
        currencyId: [this.CData.currencyId, Validators.required],
        isActive: [this.CData.isActive],
        capital: [this.CData.capital],
        latitude: [
          this.CData.latitude,
          Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
        ],
        longitude: [
          this.CData.longitude,
          Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
        ],
        timeZone: [this.CData.timeZone],
        flagEmoji: [this.CData.flagEmoji],
        nationality: [this.CData.nationality],
        createdBy: [this.CData.createdBy],
        updatedBy: [0],
        lastActionBy: [this.CData.lastActionBy],
        lastActionOn: [this.CData.lastActionOn],
      });
    }

    this.GetCurrencyList();
  }

  validateName() {
    this.form.controls['name'].markAsTouched();
  }

  GetCurrencyList() {
    this.confService.GetCurrencyList().subscribe((p) => {
      if (p.success == true) {
        this.confService.currency = p?.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  SubmitForm() {
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.confService.CreateCountry(this.form.value).subscribe((p) => {
          if (p) {
            this.snackBarService.openSnackbar(
              'Country Saved Successfully',
              'success'
            );
            this.close();
          }
        }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, 'error');
          };
      } else {
        this.confService
          .UpdateCountry(this.form.value.id, this.form.value)
          .subscribe((p) => {
            if (p) {
              this.snackBarService.openSnackbar(
                'Country Updated Successfully',
                'success'
              );
              this.close();
            }
          }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, 'error');
          };
      }
    } else {
      this.snackBarService.openSnackbar('invalid form', 'error');
      this.form.markAllAsTouched();
    }
  }

  currencyChange(id: any) {
    this.form.value.currencyId = id;
  }

  Reset() {
    this.form.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  isactiveChange(val) {
    this.form.value.isActive = val?.checked;
  }
}
