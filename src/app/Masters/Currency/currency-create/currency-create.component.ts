import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../currency.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { currencyList } from 'src/app/Interfaces/Currency';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-currency-create',
  templateUrl: './currency-create.component.html',
  styleUrls: ['./currency-create.component.scss'],
})
export class CurrencyCreateComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  currencyForm: FormGroup;
  userId: number = 0;
  currencyData: currencyList;
  constructor(
    private _formBuilder: FormBuilder,
    private _currencyService: CurrencyService,
    public dialogRef: MatDialogRef<CurrencyCreateComponent>,
    private _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currencyData = data?.currency;
  }

  ngOnInit(): void {
    // Create the currency form
    this.currencyForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      symbol: ['', Validators.required],
      isActive: [true, Validators.required],
    });
    this.userId = Number(localStorage.getItem('userId'));
    if (this.currencyData !== undefined) {
      this.currencyForm.patchValue({
        name: this.currencyData.name,
        code: this.currencyData.code,
        symbol: this.currencyData.symbol,
        isActive: this.currencyData.isActive,
      });
    }
  }

  SubmitForm() {
    if (this.currencyForm.valid) {
      if (this.currencyData !== undefined && this.currencyData !== null) {
        const payload = {
          ...this.currencyForm.value,
          createdBy: this.currencyData.createdBy,
          updatedBy: this.userId,
          id: this.currencyData.id,
        };
        this._currencyService
          .UpdateCurrency(this.currencyData.id, payload)
          .subscribe((res: any) => {
            this._snackBarService.openSnackbar(
              'Currency Updated Successfully',
              'close'
            );
            this.close();
          }),
          (error) => {
            this._snackBarService.openSnackbar(error.message, 'Close');
          };
      } else {
        const payload = {
          ...this.currencyForm.value,
          createdBy: this.userId,
          updatedBy: 0,
        };
        this._currencyService.CreateCurrency(payload).subscribe((res: any) => {
          this._snackBarService.openSnackbar(
            'Currency Created Successfully',
            'close'
          );
          this.close();
        }),
          (error) => {
            this._snackBarService.openSnackbar(error.message, 'Close');
          };
      }
    }
  }

  Reset() {
    this.currencyForm.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  isactiveChange(val) {
    this.currencyForm.value.isActive = val?.checked;
  }
}
