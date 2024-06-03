import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StateService } from '../state.service';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../../Country/country.service';
import { CountryData } from '../../Country/country-list/country-list.component';
@Component({
  selector: 'app-state-create',
  templateUrl: './state-create.component.html',
  styleUrl: './state-create.component.scss',
})
export class StateCreateComponent implements OnInit {
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  nationality: any;
  stateForm: FormGroup;
  stateData: any;
  countryList: CountryData[] = [];
  selectedCountry;

  constructor(
    public dialogRef: MatDialogRef<StateCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _stateService: StateService,
    private _countryService: CountryService,
    private _toastr: ToastrService
  ) {
    this.stateData = data?.state;
    if (!this.stateData) {
      this.stateForm = this._formBuilder.group({
        id: 0,
        name: ['', Validators.required],
        code: ['', Validators.required],
        gstCode: [null],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
        countryId: ['', Validators.required],
        isActive: ['', Validators.required],
      });
    } else {
      this.selectedCountry = this.stateData.country.id
      this.stateForm = this._formBuilder.group({
        id: this.stateData.id,
        name: [this.stateData.name],
        code: [this.stateData.code],
        countryId: [this.stateData.country],
        gstCode: [this.stateData.gstCode],
        latitude: [this.stateData.latitude],
        longitude: [this.stateData.longitude],
        isActive: [this.stateData.isActive],
      });
    }
  }

  ngOnInit(): void {
    this.GetCountryList();
  }

  GetCountryList() {
    this._countryService.GetCountryList().subscribe((res: any) => {
      this.countryList = res.data;
    });
  }

  SubmitForm() {
    if (this.stateForm.valid) {
      if (this.stateForm.value.id == 0) {
        // const payload = {
        //   ...this.stateForm.value,
        //   updatedBy: 1,
        //   createdBy: 3,
        // };
        // /console.log(payload, 'create state')
        this._stateService.CreateState(this.stateForm.value).subscribe((p) => {
          this._toastr.success('State Saved Successfully');
          this.close();
        });
      } else {
        debugger
        // const payload = {
        //   ...this.stateForm.value,
        //   updatedBy: 1,
        //   createdBy: 3,
        // };

        // console.log(payload, 'update state')
        this._stateService.UpdateState(this.stateForm.value.id, this.stateForm.value)
          .subscribe((p) => {
            // if (p) {
            this._toastr.success('State Updated Successfully');
            this.close();
            // }
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
