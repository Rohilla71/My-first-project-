import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleSizeList } from 'src/app/Interfaces/VehicleSize';
import { VehicleSizeService } from '../vehicle-size.service';

@Component({
  selector: 'app-vehicle-size-create',
  templateUrl: './vehicle-size-create.component.html',
  styleUrls: ['./vehicle-size-create.component.scss'],
})
export class VehicleSizeCreateComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  vehicleSizeForm: FormGroup;
  userId: number = 0;
  vehicleSizeData: VehicleSizeList;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _vehicleSizeService: VehicleSizeService,
    public dialogRef: MatDialogRef<VehicleSizeCreateComponent>
  ) {
    this.vehicleSizeData = data?.vehicleSize;
  }

  ngOnInit(): void {
    // Create the currency form
    this.vehicleSizeForm = this._formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      description: ['', Validators.maxLength(500)],
      sizeInSqft: ['',Validators.pattern('^[0-9]+$')],
      height: ['', Validators.pattern('^[0-9]+$')],
      width: ['', Validators.pattern('^[0-9]+$')],
      length: ['', Validators.pattern('^[0-9]+$')],
      isActive: [true,],
    });
    this.userId = Number(localStorage.getItem('userId'));
    if (this.vehicleSizeData !== undefined) {
      this.vehicleSizeForm.patchValue({
        name: this.vehicleSizeData.name,
        description: this.vehicleSizeData.description,
        sizeInSqft: this.vehicleSizeData.sizeInSqft,
        height: this.vehicleSizeData.height,
        width: this.vehicleSizeData.width,
        length: this.vehicleSizeData.length,
        isActive: this.vehicleSizeData.isActive,
      });
    }
  }

  validateName(){
    this.vehicleSizeForm.controls['name'].markAsTouched();
  }


  SubmitForm() {
    if (this.vehicleSizeForm.valid) {
      if (this.vehicleSizeData !== undefined && this.vehicleSizeData !== null) {
        const payload = {
          ...this.vehicleSizeForm.value,
          id: this.vehicleSizeData.id,
        };
        this._vehicleSizeService
          .UpdateVehicleSize(this.vehicleSizeData.id, payload)
          .subscribe((res: any) => {
            this._vehicleSizeService.openSnackbar(
              'Vehicle size updated successfully!',
              'close'
            );
            this.close();
          });
      } else {
        const payload = {
          ...this.vehicleSizeForm.value,
        };
        this._vehicleSizeService
          .CreateVehicleSize(payload)
          .subscribe((res: any) => {
            this._vehicleSizeService.openSnackbar(
              'Vehicle size created successfully!',
              'close'
            );
            this.close();
          });
      }
    }
  }

  Reset() {
    this.vehicleSizeForm.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  isactiveChange(val) {
    this.vehicleSizeForm.value.isActive = val?.checked;
  }
}
