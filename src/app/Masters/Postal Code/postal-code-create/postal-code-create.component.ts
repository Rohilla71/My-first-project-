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
        countryId: ['', Validators.required],
        stateId: ['', Validators.required],
        cityId: ['', Validators.required],
        postalCode: ['', Validators.required],
        latitude: [],
        longitude: [''],
        isTaxApplicable: [true],
        taxRate: ['', Validators.maxLength(2)],
        isActive: [true],
        description: ['', Validators.maxLength(500)],
      });

      this.Reset();
      this.form.controls['id'].setValue(0);

    } else {

      if (this.postalcodeData !== undefined) {
        this.GetStateByCountryId(this.postalcodeData.countryId);
        this.GetCityByStateId(this.postalcodeData.stateId);
        this.getPostalCodeByCityId(this.postalcodeData.cityId);

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
        });
      }
    }

  }

  ngOnInit(): void {
  }

  SubmitForm() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const payload = {
        id :this.form.value.id,
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

  getPostalCodeByCityId(id: any) {
    this._sharedService.getPostalCodeByCityId(id).subscribe((res: any) => {
      if (res.success) {
        this.postCodeList = res.data;
      }
    });
  }

  // cityChange(id: any) {
  //   this.form.controls['cityId'].setValue(id);
  // }
  onCountryChange(event: any) {
    this.stateList = [];
    this.form.controls['stateId'].reset();
    this.form.controls['cityId'].reset();
    this.form.controls['postalCode'].reset();
    this.GetStateByCountryId(event.id);
  }

  onStateChange(event: any) {
    this.cityList = [];
    this.form.controls['cityId'].reset();
    this.form.controls['postalCode'].reset();
    this.GetCityByStateId(event.id);
  }

  onCityChange(event: any) {
    this.postCodeList = [];
    this.form.controls['postalCode'].reset();
    this.getPostalCodeByCityId(Number(event?.id));
  }

  

  
}
