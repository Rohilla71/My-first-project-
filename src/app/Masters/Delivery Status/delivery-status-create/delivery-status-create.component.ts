import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DeliveryStatusService } from '../delivery-status.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-delivery-status-create',
  templateUrl: './delivery-status-create.component.html',
  styleUrls: ['./delivery-status-create.component.scss'],
})
export class DeliveryStatusCreateComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  nationality: any;
  form: FormGroup;
  DSData: any;
  selectedCurrency;

  constructor(
    public dialogRef: MatDialogRef<DeliveryStatusCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public deliveryStatusService: DeliveryStatusService,
    public snackBarService: SnackBarService
  ) {
    this.DSData = data?.country;
    if (!this.DSData) {
      this.form = this.fb.group({
        id: 0,
        name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
        description: ['', Validators.maxLength(200)],
        sequence: ['', Validators.required],
        isActive: [true],
      });
    } else {
      this.form = this.fb.group({
        id: this.DSData.id,
        name: [this.DSData.name, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
        description: [this.DSData.description, [Validators.maxLength(200)]],
        sequence: [this.DSData.sequence, [Validators.required]],
        isActive: [this.DSData.isActive],
      });
    }
  }

  validateName(){
    this.form.controls['name'].markAsTouched();
  }

  SubmitForm() {
    
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.deliveryStatusService
          .CreateDelieveryStatus(this.form.value)
          .subscribe((p) => {
            if (p) {
              this.snackBarService.openSnackbar(
                'Delivery Saved Successfully',
                'success'
              );
              this.close();
            }
          }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, 'error');
          };
      } else {
        this.deliveryStatusService
          .UpdateDelieveryStatus(this.form.value.id, this.form.value)
          .subscribe((p) => {
            if (p) {
              this.snackBarService.openSnackbar(
                'Delivery Updated Successfully',
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
      this.snackBarService.openSnackbar('Invalid Form', 'error');
      this.form.markAllAsTouched();
    }
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
