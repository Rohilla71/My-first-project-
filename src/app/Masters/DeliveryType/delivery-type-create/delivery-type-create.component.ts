import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DeliveryTypeService } from '../delivery-type.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeliveryTypeList } from 'src/app/Interfaces/DeliveryType';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-delivery-type-create',
  templateUrl: './delivery-type-create.component.html',
  styleUrls: ['./delivery-type-create.component.scss'],
})
export class DeliveryTypeCreateComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  deliveryTypeForm: FormGroup;
  userId: number = 0;
  deliveryTypeData: DeliveryTypeList;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _deliveryTypeService: DeliveryTypeService,
    private _snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<DeliveryTypeCreateComponent>
  ) {
    this.deliveryTypeData = data?.delivery;
  }

  ngOnInit(): void {
    this.deliveryTypeForm = this._formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      description: ['', [Validators.required]],
      isActive: [true, Validators.required],
    });
    this.deliveryTypeForm.markAllAsTouched();

    this.userId = Number(localStorage.getItem('userId'));
    if (this.deliveryTypeData !== undefined) {
      this.deliveryTypeForm.patchValue({
        name: this.deliveryTypeData.name,
        description: this.deliveryTypeData.description,
        isActive: this.deliveryTypeData.isActive,
      });
    }
  }

  validateName(){
    this.deliveryTypeForm.controls['name'].markAsTouched();
  }

  SubmitForm() {
    if (this.deliveryTypeForm.valid) {
      if (
        this.deliveryTypeData !== undefined &&
        this.deliveryTypeData !== null
      ) {
        const payload = {
          ...this.deliveryTypeForm.value,
          id: this.deliveryTypeData.id,
        };
        this._deliveryTypeService
          .UpdateDeliveryType(this.deliveryTypeData.id, payload)
          .subscribe((res: any) => {
            this._snackBarService.openSnackbar(
              'Delivery Type Updated Successfully!',
              'close'
            );
            this.close();
          });
      } else {
        const payload = {
          ...this.deliveryTypeForm.value,
        };
        this._deliveryTypeService
          .CreateDeliveryType(payload)
          .subscribe((res: any) => {
            this._snackBarService.openSnackbar(
              'Delivery Type Created Successfully!',
              'close'
            );
            this.close();
          });
      }
    }
  }

  Reset() {
    this.deliveryTypeForm.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  isactiveChange(val) {
    this.deliveryTypeForm.value.isActive = val?.checked;
  }
}
