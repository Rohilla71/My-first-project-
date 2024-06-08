import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceTermService } from '../invoice-term.service';
import { invoiceTermList } from 'src/app/Interfaces/InvoiceTerm';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-invoice-term-create',
  templateUrl: './invoice-term-create.component.html',
  styleUrls: ['./invoice-term-create.component.scss'],
})
export class InvoiceTermCreateComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  invoiceTermForm: FormGroup;
  userId: number = 0;
  invoiceTermData: invoiceTermList;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _invoiceTermService: InvoiceTermService,
    private _snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<InvoiceTermCreateComponent>
  ) {
    this.invoiceTermData = data?.invoiceDate;
  }

  ngOnInit(): void {
    this.invoiceTermForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true, Validators.required],
    });
    this.userId = Number(localStorage.getItem('userId'));
    if (this.invoiceTermData !== undefined) {
      this.invoiceTermForm.patchValue({
        name: this.invoiceTermData.name,
        description: this.invoiceTermData.description,
        isActive: this.invoiceTermData.isactive,
      });
    }
  }

  SubmitForm() {
    if (this.invoiceTermForm.valid) {
      if (this.invoiceTermData !== undefined && this.invoiceTermData !== null) {
        const payload = {
          ...this.invoiceTermForm.value,
          id: this.invoiceTermData.id,
        };
        this._invoiceTermService
          .UpdateInvoiceTerm(this.invoiceTermData.id, payload)
          .subscribe((res: any) => {
            this._snackBarService.openSnackbar(
              'Invoice updated successfully!',
              'close'
            );
            this.close();
          }),
          (error) => {
            this._snackBarService.openSnackbar(error.message, 'Close');
          };
      } else {
        const payload = {
          ...this.invoiceTermForm.value,
        };
        this._invoiceTermService
          .CreateInvoiceTerm(payload)
          .subscribe((res: any) => {
            this._snackBarService.openSnackbar(
              'Invoice created successfully!',
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
    this.invoiceTermForm.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  isactiveChange(val) {
    this.invoiceTermForm.value.isActive = val?.checked;
  }
}
