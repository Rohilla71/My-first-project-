import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StateService } from '../state.service';
import { CountryService } from '../../Country/country.service';
import { CountryData } from '../../Country/country-list/country-list.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
@Component({
  selector: 'app-state-create',
  templateUrl: './state-create.component.html',
  styleUrl: './state-create.component.scss',
})
export class StateCreateComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  nationality: any;
  stateForm: FormGroup;
  stateData: any;
  countryList: CountryData[] = [];

  constructor(
    public dialogRef: MatDialogRef<StateCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _stateService: StateService,
    public _countryService: CountryService,
    private _snackBarService: SnackBarService
  ) {
    this.stateData = data?.state;
    if (!this.stateData) {
      this.stateForm = this._formBuilder.group({
        id: [0],
        name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
        code: ['', Validators.required],
        countryId: ['', Validators.required],
        gstCode: [null, [Validators.maxLength(2), Validators.pattern('^[0-9]+$')]],
        latitude: [''],
        longitude: [''],
        isActive: [true],
      });
      
      this.Reset();
      this.stateForm.controls['id'].setValue(0);

    } else {
      this.stateForm = this._formBuilder.group({
        id: this.stateData.id,
        name: [this.stateData.name, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
        code: [this.stateData.code, Validators.required],
        countryId: [this.stateData.country.id,  Validators.required],
        gstCode: [this.stateData.gstCode],
        latitude: [this.stateData.latitude],
        longitude: [this.stateData.longitude],
        isActive: [this.stateData.isActive],
      });
    }

  }

  validateName(){
    this.stateForm.controls['name'].markAsTouched();
  }


   ngOnInit(): void {
    this.GetCountryList();
  }

  GetCountryList() {
    
    this._countryService.GetCountryList().subscribe((res: any) => {
      this._countryService.countries = res.data;
    }),
      (error) => {
        this._snackBarService.openSnackbar(error.message, 'Close');
      };
  }

  SubmitForm() {
    this.stateForm.markAllAsTouched();
    if (this.stateForm.valid) {
      if (this.stateForm.value.id == 0) {
        this._stateService.CreateState(this.stateForm.value).subscribe((p) => {
          this._snackBarService.openSnackbar(
            'State Saved Successfully',
            'close'
          );
          this.close();
        });
      } else {
        this._stateService
          .UpdateState(this.stateForm.value.id, this.stateForm.value)
          .subscribe((p) => {
            this._snackBarService.openSnackbar(
              'State Updated Successfully',
              'close'
            );
            this.close();
          });
      }
    } else {
      this.stateForm.touched;
    }
  }

  Reset() {
    this.stateForm.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  isactiveChange(val) {
    this.stateForm.value.isActive = val?.checked;
  }
}
