import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostalCodeService } from '../postal-code.service';
import { CityService } from '../../City/city.service';
import { CountryService } from '../../Country/country.service';
import { Observable, startWith, map } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { StateList } from '../../State/state.types';
import { cityI } from 'src/app/Interfaces/City';
import { SharedService } from 'src/app/shared/services/shared.service';
import { postalCodeI } from 'src/app/Interfaces/PostalCode';

@Component({
  selector: 'app-postal-code-create',
  templateUrl: './postal-code-create.component.html',
  styleUrls: ['./postal-code-create.component.scss'],
})
export class PostalCodeCreateComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  form: FormGroup;
  // userId: number = 0;
  postalcodeData: any;

  selectedCountry = '';
  selectedState = '';
  selectedCity = '';

  countryList: any = [];
  stateList: StateList[] = [];
  cityList: cityI[] = [];
  postCodeList: postalCodeI[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private service: PostalCodeService,
    public dialogRef: MatDialogRef<PostalCodeCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cityService: CityService,
    public countryService: CountryService,
    public snackBarService: SnackBarService,
    public _sharedService: SharedService
  ) {
    this.GetCountryList();

    this.postalcodeData = data?.data;
    if (!this.postalcodeData) {
      this.form = this._formBuilder.group({
        id: [0],
        countryId: [''],
        stateId: [''],
        cityId: ['', Validators.required],
        postalCode: ['', Validators.required],
        latitude: [],
        longitude: [''],
        isTaxApplicable: [false],
        taxRate: [''],
        isActive: [true],
        description: [''],
        // lastActionBy: [''],
        // lastActionOn: [''],
      });

      this.Reset();
    } else {
      this.selectedCountry = this.postalcodeData?.countryName;
      this.selectedState = this.postalcodeData?.stateName;
      this.selectedCity = this.postalcodeData?.cityName;

      if (this.postalcodeData !== undefined) {
        this.GetStateByCountryId(this.postalcodeData.countryId);
        this.GetCityByStateId(this.postalcodeData.stateId);
        this.getPostalCodeByCityId(Number(this.postalcodeData.postalCode));

        this.form = this._formBuilder.group({
          id: this.postalcodeData.id,
          countryId: [this.postalcodeData.countryId],
          stateId: [this.postalcodeData.stateId],
          cityId: this.postalcodeData.cityId,
          postalCode: this.postalcodeData.postalCode,
          latitude: this.postalcodeData.latitude,
          longitude: this.postalcodeData.longitude,
          isTaxApplicable: this.postalcodeData.isTaxApplicable,
          taxRate: this.postalcodeData.taxRate,
          isActive: this.postalcodeData.isActive,
          description: this.postalcodeData.description,
          // lastActionBy: this.postalcodeData.lastActionBy,
          // lastActionOn: this.postalcodeData.lastActionOn,
        });
      }
    }
  }

  ngOnInit(): void {
    //this.userId = Number(localStorage.getItem('userId'));
  }

  filtercountry(name: any) {
    let arr = this.countryService.countries.filter(
      (country) => country.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    if (arr.length == 1) {
      this.form.controls['countryId'].setValue(arr[0].id);
      this.GetStateByCountryId(arr[0].id);
    }
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }

  filterState(name: any) {
    let arr = this.cityService.states.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    if (arr.length == 1) {
      this.form.controls['stateId'].setValue(arr[0].id);
      this.GetCityByStateId(arr[0].id);
    }
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }

  filterCity(name: any) {
    let arr = this.cityService.cities.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    if (arr.length == 1) {
      this.form.controls['cityId'].setValue(arr[0].id);
    }
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }

  SubmitForm() {
    if (this.form.valid) {
      const payload = {
        countryId: this.form.value.countryId,
        stateId: this.form.value.stateId,
        cityId: this.form.value.cityId,
        postalCode: this.form.value.postalCode.toString(),
        latitude: this.form.value.latitude,
        longitude: this.form.value.longitude,
        isTaxApplicable: this.form.value.isTaxApplicable,
        taxRate: this.form.value.taxRate,
        isActive: this.form.value.isActive,
        description: this.form.value.description,
      };
      if (this.postalcodeData !== undefined && this.postalcodeData !== null) {
        this.service
          .UpdatePostalCode(this.postalcodeData.id, payload)
          .subscribe((res: any) => {
            this.snackBarService.openSnackbar(
              'Data Updated Successfully',
              'success'
            );
            this.close();
          }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, 'error');
          };
      } else {
        this.service.CreatePostalCode(payload).subscribe((res: any) => {
          this.snackBarService.openSnackbar(
            'Data Created Successfully',
            'success'
          );
          this.close();
        }),
          (error) => {
            this.snackBarService.openSnackbar(error.message, 'error');
          };
      }
    }
  }

  Reset() {
    this.form.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  isTaxApplicableChange(val) {
    this.form.value.isTaxApplicable = val?.checked;
  }
  isactiveChange(val) {
    this.form.value.isActive = val?.checked;
  }

  GetCountryList() {
    this.countryService.GetCountryList().subscribe((p) => {
      if (p.success == true) {
        this.countryList = p?.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  GetStateByCountryId(id: any) {
    this.cityService.GetStateByCountryId(id).subscribe((p) => {
      if (p.success == true) {
        this.stateList = p?.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  GetCityByStateId(id: any) {
    this.cityService.GetCityByStateId(id).subscribe((p) => {
      if (p.success == true) {
        this.cityList = p?.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  cityChange(id: any) {
    this.form.controls['cityId'].setValue(id);
  }
  onCountryChange(event: any) {
    this.cityService.GetStateByCountryId(event.id).subscribe((res: any) => {
      if (res.success === true) {
        this.stateList = res.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  onStateChange(event: any) {
    this.cityService.GetCityByStateId(event.id).subscribe((res: any) => {
      if (res.success === true) {
        this.cityList = res.data;
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  onCityChange(event: any) {
    this.getPostalCodeByCityId(Number(event.id));
  }

  getPostalCodeByCityId(id: any) {
    debugger
    this._sharedService.getPostalCodeByCityId(id).subscribe((res: any) => {
      if (res.success) {
        this.postCodeList = res.data;
      }
    });
  }

  onPostalCodeChange(event: any) {
    console.log(event);
  }
}
