import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from '../country.service';
import { ThemePalette } from '@angular/material/core';
import { Observable, map, startWith } from 'rxjs';
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
  selectedCurrency;

  currencyCtrl: FormControl<any>;
  filteredCurrency: Observable<unknown>;

  constructor(
    public dialogRef: MatDialogRef<CountryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public confService: CountryService,
    public snackBarService : SnackBarService
  ) {

    this.GetCurrencyList();

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
        lastActionOn: [''],
      });
    } else {
      
      this.selectedCurrency = this.CData.currencyId;
      this.form = this.fb.group({
        id: this.CData.id,
        name: [this.CData.name, Validators.required],
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

    this.LoadCurrency();
  }

  LoadCurrency(){
    this.currencyCtrl = new FormControl();
    this.filteredCurrency = this.currencyCtrl.valueChanges.pipe(
      startWith(''),
      map((item) =>
        item ? this.filterCurrency(item) : this.confService.currency.slice()
      )
    );
  }

  filterCurrency(name: any) {
    let arr = this.confService.currency.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    if (arr.length == 1) {
      this.form.controls['currencyId'].setValue(arr[0].id);
    }
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }

  SubmitForm() {
    debugger
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.confService.CreateCountry(this.form.value).subscribe((p) => {
          if (p) {
            this.snackBarService.openSnackbar("Country Saved Successfully", "success");
            this.close();
          }
        }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, "error");
          };
      } else {
        this.confService
          .UpdateCountry(this.form.value.id, this.form.value)
          .subscribe((p) => {
            if (p) {
              this.snackBarService.openSnackbar("Country Updated Successfully", "success");
              this.close();
            }
          }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, "error");
          };
      }
    } else {
      this.snackBarService.openSnackbar("invalid form", "error");
      this.form.markAllAsTouched();
    }
  }

  GetCurrencyList() {
    this.confService.GetCurrencyList().subscribe((p) => {
      if (p.success == true) {
        this.confService.currency = p?.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, "error");
      };
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
