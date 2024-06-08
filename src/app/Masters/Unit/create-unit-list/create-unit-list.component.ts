import { UnitService } from './../unit.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryCreateComponent } from 'src/app/Masters/Country/country-create/country-create.component';
import { ThemePalette } from '@angular/material/core';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-create-unit-list',
  templateUrl: './create-unit-list.component.html',
  styleUrls: ['./create-unit-list.component.scss'],
})
export class CreateUnitListComponent {
  form: FormGroup;
  CData: any;
  checked = false;
  color: ThemePalette = 'accent';
  public title = 'Create Unit';
  public isHidden = true;
  constructor(
    public dialogRef: MatDialogRef<CountryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public unitlistService: UnitService,
    private _snackBarService: SnackBarService,
  ) {
    this.CData = data?.listdata;
    if (!this.CData) {
      this.form = this.fb.group({
        id: 0,
        name: ['', Validators.required],
        description: ['', Validators.required],
        isActive: [true],
        lastActionBy: [''],
        lastActionOn: [''],
      });
    } else {
      this.title = 'Edit Unit';
      this.form = this.fb.group({
        id: this.CData.id,
        name: [this.CData.name, Validators.required],
        description: [this.CData.description, Validators.required],
        isActive: [this.CData.isActive],
        lastActionBy: [{ value: this.CData.lastActionBy }],
        lastActionOn: [{ value: this.CData.lastActionOn }],
      });
    }
  }

  SubmitForm() {
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.unitlistService.createUnitList(this.form.value).subscribe((p) => {
          if (p) {
            this._snackBarService.openSnackbar(
              'Saved Successfully',
              'close'
            );
            this.close();
          }
        }),
          (error) => {
            this._snackBarService.openSnackbar(
              error.message,
              'close'
            );
          };
      } else {
        this.unitlistService
          .UpdateUnitList(this.form.value.id, this.form.value)
          .subscribe((p) => {
            if (p) {
              this._snackBarService.openSnackbar(
                'Updated Successfully',
                'close'
              );
              this.close();
            }
          }),
          (error) => {
            this._snackBarService.openSnackbar(
              error.message,
              'close'
            );
          };
      }
    } else {
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
