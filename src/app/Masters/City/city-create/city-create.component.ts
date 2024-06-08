import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityService } from '../city.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryService } from '../../Country/country.service';
import { Observable, map, startWith } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

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
  CData: any;
  selectedCountry;
  selectedState;

  countryCtrl: FormControl<any>;
  filteredCountry: Observable<unknown>;

  stateCtrl: FormControl<any>;
  filteredState: Observable<unknown>;

  constructor(
    public dialogRef: MatDialogRef<CityCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public service: CityService,
    public service2: CountryService,
    public snackBarService : SnackBarService
  ) {
    
    this.GetCountryList();

    this.CData = data?.city;
    if (!this.CData) {
      this.form = this.fb.group({
        id: 0,
        name: ['', Validators.required],
        countryId: [0],
        stateId: [0, Validators.required],
        isActive: ['', Validators.required],
        latitude: [''],
        longitude: [''],
        createdBy: [0],
        updatedBy: [0],
      });
    } else {

      this.selectedState = this.CData.state.name;
      this.countryBind(this.CData.state.id);
      this.form = this.fb.group({
        id: this.CData.id,
        name: [this.CData.name],
        countryId: [0],
        stateId: [this.CData.state.id],
        isActive: [this.CData.isActive],
        latitude: [this.CData.latitude],
        longitude: [this.CData.longitude],
        createdBy: [this.CData.createdBy],
        updatedBy: [0],
      });
    }

    this.loadCountry();
    this.loadState();
  }

  loadCountry(){debugger
    this.countryCtrl = new FormControl();
    this.filteredCountry = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map((country) =>
        country ? this.filtercountry(country) : this.service2.countries.slice()
      )
    );

    

  }

  loadState(){debugger
    
    this.stateCtrl = new FormControl();
    this.filteredState = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((item) =>
        item ? this.filterState(item) : this.service.states.slice()
      )
    );

  }
  
  filtercountry(name: any) {
    let arr = this.service2.countries.filter(
      (country) => country.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    if (arr.length == 1) {
      this.form.controls['countryId'].setValue(arr[0].id);
      this.GetStateByCountryId(arr[0].id);
    }
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }

  filterState(name: any) {
    let arr = this.service.states.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    if (arr.length == 1) {
      this.form.controls['stateId'].setValue(arr[0].id);
    }
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }

  SubmitForm() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.service.CreateCity(this.form.value).subscribe((p) => {
          if (p) {
            this.snackBarService.openSnackbar("City Saved Successfully", "success");
            this.close();
          }
        }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, "error");           
          };
      } else {
        this.service
          .UpdateCity(this.form.value.id, this.form.value)
          .subscribe((p) => {
            if (p) {
              this.snackBarService.openSnackbar("City Updated Successfully", "success");
              this.close();
            }
          }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, "error");
          };
      }
    } else {
      this.snackBarService.openSnackbar("invalid form", "error");
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
    this.service2.GetCountryList().subscribe((p) => {
      if (p.success == true) {
        this.service2.countries = p?.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, "error");
      };
  }

  GetStateByCountryId(id: any) {
    this.service.GetStateByCountryId(id).subscribe((p) => {
      if (p.success == true) {
        debugger
        this.service.states = p?.data;
        this.loadState();
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, "error");
      };
  }

  countryBind(id: any) {
    this.service.GetCountryByStateId(id).subscribe((p) => {
      if (p.success == true) {
        this.selectedCountry = p.data.name;
        this.form.controls['countryId'].setValue(p.data.id);
        this.GetStateByCountryId(p.data.id);
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, "error");
      };
  }

  stateChange(id: any) {
    this.form.controls['stateId'].setValue(id);
    // this.form.value.stateId = id;
  }
}
