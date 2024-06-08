import { error } from 'jquery';
import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StateService } from '../state.service';
import { CountryService } from '../../Country/country.service';
import { CountryData } from '../../Country/country-list/country-list.component';
import { Observable, map, startWith } from 'rxjs';
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
  selectedCountry;

  countryCtrl: FormControl<any>;
  filteredCountry: Observable<unknown>;

  constructor(
    public dialogRef: MatDialogRef<StateCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _stateService: StateService,
    private _countryService: CountryService,
    private _snackBarService: SnackBarService
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
        isActive: [true],
      });
    } else {
      this.selectedCountry = this.stateData.country.name;
      this.stateForm = this._formBuilder.group({
        id: this.stateData.id,
        name: [this.stateData.name],
        code: [this.stateData.code],
        countryId: [this.stateData.country.id],
        gstCode: [this.stateData.gstCode],
        latitude: [this.stateData.latitude],
        longitude: [this.stateData.longitude],
        isActive: [this.stateData.isActive],
      });
    }

    this.countryCtrl = new FormControl();

    this.filteredCountry = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map((item) =>
        item ? this.filterCountry(item) : this._countryService.countries.slice()
      )
    );
  }

  filterCountry(name: any) {
    let arr = this._countryService.countries.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    if (arr.length == 1) {
      this.stateForm.controls['countryId'].setValue(arr[0].id);
    }
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
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
