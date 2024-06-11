import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityService } from '../city.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  MaxValidator,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryService } from '../../Country/country.service';
import { Observable, map, startWith } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { cityI } from 'src/app/Interfaces/City';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrl: './city-create.component.scss',
})
export class CityCreateComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  nationality: any;
  form: FormGroup;
  cityDataData: any = [];

  constructor(
    public dialogRef: MatDialogRef<CityCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public cityService: CityService,
    public countryService: CountryService,
    public snackBarService: SnackBarService
  ) {
    
    this.GetCountryList();

    this.cityDataData = data?.city;
    if (!this.cityDataData) {
      this.form = this.fb.group({
        id: [0, Validators.required],
        name: ['',Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
        countryId: [0, Validators.required],
        stateId: [0, Validators.required],
        isActive: ['', Validators.required],
        latitude: [''],
        longitude: [''],
      });

      this.Reset();
      this.form.controls['id'].setValue(0);
    } else {
      this.GetStateByCountryId(this.cityDataData.countryId);

      this.form = this.fb.group({
        id: [this.cityDataData.id, Validators.required],
        name: [
          this.cityDataData.name,
          Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
        ],
        countryId: [this.cityDataData.countryId],
        stateId: [this.cityDataData.stateId, Validators.required],
        isActive: [this.cityDataData.isActive, Validators.required],
        latitude: [this.cityDataData.latitude],
        longitude: [this.cityDataData.longitude],
      });
    }
  }

  validateName(){
    this.form.controls['name'].markAsTouched();
  }

  SubmitForm() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.cityService.CreateCity(this.form.value).subscribe((p) => {
          if (p) {
            this.snackBarService.openSnackbar(
              'City Saved Successfully',
              'success'
            );
            this.close();
          }
        }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, 'error');
          };
      } else {
        this.cityService
          .UpdateCity(this.form.value.id, this.form.value)
          .subscribe((p) => {
            if (p) {
              this.snackBarService.openSnackbar(
                'City Updated Successfully',
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
      this.snackBarService.openSnackbar('invalid form', 'error');
      this.form.markAllAsTouched();
    }
  }

  isactiveChange(val) {
    this.form.value.isActive = val?.checked;
  }

  Reset() {
    this.form.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  GetCountryList() {
    this.countryService.GetCountryList().subscribe((p) => {
      if (p.success == true) {
        this.countryService.countries = p?.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  GetStateByCountryId(id: any) {
    this.cityService.GetStateByCountryId(id).subscribe((p) => {
      if (p.success == true) {
        
        this.cityService.states = p?.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  onCountryChange(event: any) {
    
    this.cityService.states = [];
    this.form.controls['stateId'].setValue(0);
    this.GetStateByCountryId(event.id);
  }
}
