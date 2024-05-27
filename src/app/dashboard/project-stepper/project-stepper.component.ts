import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { StepperService } from 'src/app/shared/services/stepper.service';

/**
 * @title Stepper overview
 */
@Component({
  selector: 'stepper-overview-example',
  templateUrl: './project-stepper.component.html',
  styleUrl: './project-stepper.component.scss'

})
export class StepperOverviewExample implements OnInit {
  selectedCountry = {
    id: ''
  };
  isStateSelected = false
  formGroup = this._formBuilder.group({
    formArray: this._formBuilder.array([
      this._formBuilder.group({
        accNmbr: ['', Validators.required],
        accRefrnc: [''],
        credLimit: [''],
        termId: ['', Validators.required],
        address: ['', Validators.required],
        postalCode: ['', Validators.required],
        email: ['']
      }),
      this._formBuilder.group({
        collctAddress: ['', Validators.required],
        collctPostalCode: ['', Validators.required],
        warehouseEmail: ['', Validators.required],
        categoryId: ['', Validators.required],
        fuelSurcharge: [''],
        delInstruction: [''],
        delStatusId: ['', Validators.required],
        dropTime: ['', Validators.required],
        itemWeight: ['']
      }),
      this._formBuilder.group({
        personalId: ['', Validators.required],
        name: ['', Validators.required],
        countryId: ['', Validators.required],
        stateId: [{value: '', disabled: true}, Validators.required],
        cityId: [{value: '', disabled: true}, Validators.required],
        contactName: ['', Validators.required],
        contactEmail: [''],
        contactNumber: ['', Validators.required],
        mainAddress: ['', Validators.required],
        contactReqEmails: [''],
        mainPostalCode: ['', Validators.required],
        alertEmails: ['', Validators.required],
        alternateContactNum: [''],
        alternateContactName: [''],
        alternateContactEmail: [''],
        createdBy: ['', Validators.required],
        updatedBy: [''],
        isActive: ['', Validators.required]
      }),
      this._formBuilder.group({
        ownLabels: [false, Validators.required],
        ownPaperWork: [false],
        warehouseTab: [false, Validators.required],
        serviceLevel: [false, Validators.required],
        delPoint: [false],
        unpacked: [false],
        packageAway: [false],
        assemble: [false],
        disassemeble: [false],
        collectDisposal: [false, Validators.required],
        disclaimer: [false],
        logoUrl: [false],
        invoiceForced: [false],
        podInvoice: [false, Validators.required],
        logoPath: ['']
      })
    ])
  });
  isLinear = false;
  countryList = [];
  stateList = [];
  cityList = [];
  // formGroup: any;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder, public stepperDataService: StepperService) { }

  ngOnInit() {
    this.getcountrylist();
  }
  getcountrylist() {
    this.stepperDataService.getCountry().subscribe((list: any) => {
      this.countryList = list.data
    },
      (error: any) => {
        throw error
      })
  }
  countrySelect(event) {
    const getformconrol: any = this.formArray.get([2])
    getformconrol.controls.stateId.enable()
    this.stepperDataService.getState(event.value.id).subscribe((list: any) => {
      this.stateList = list.data
    },
      (error: any) => {
        throw error
      })
  }

  stateSelect(event) {
    const getformconrol: any = this.formArray.get([2])
    getformconrol.controls.cityId.enable()
    this.stepperDataService.getCity(event.value.id).subscribe((list: any) => {
      this.cityList = list.data
    },
      (error: any) => {
        throw error
      })
  }

  onSubmit() {
    const getformconrol1: any = this.formArray.get([0])
    const getformconrol2: any = this.formArray.get([1])
    const getformconrol3: any = this.formArray.get([2])
    const getformconrol4: any = this.formArray.get([3])
    const formData = {
      accountDetails: {
        accountNumber: getformconrol1.controls.accNmbr.value,
        accountReference: getformconrol1.controls.accRefrnc.value,
        creditLimit: getformconrol1.controls.credLimit.value,
        invoiceTermId: getformconrol1.controls.termId.value,
        invoiceAddress: getformconrol1.controls.address.value,
        invoicePostalCode: getformconrol1.controls.postalCode.value,
        invoiceEmails: getformconrol1.controls.email.value
      },
      deliveryDetails: {
        collectionAddress: getformconrol2.controls.collctAddress.value,
        collectionPostalCode: getformconrol2.controls.collctPostalCode.value,
        warehouseContactEmails: getformconrol2.controls.warehouseEmail.value,
        productChargeCategoryIds: getformconrol2.controls.categoryId.value,
        fuleSurchargePercent: getformconrol2.controls.fuelSurcharge.value,
        defaultDeliveryInstructions: getformconrol2.controls.delInstruction.value,
        defaultDeliveryStatusId: getformconrol2.controls.delStatusId.value,
        defaultDropTime: getformconrol2.controls.dropTime.value,
        defaultItemWeight: getformconrol2.controls.itemWeight.value
      },
      personalDetails: {
        id: getformconrol3.controls.personalId.value,
        name: getformconrol3.controls.name.value,
        countryId: getformconrol3.controls.countryId.value.id,
        stateId: getformconrol3.controls.stateId.value.id,
        cityId: getformconrol3.controls.cityId.value.id,
        mainContactName: getformconrol3.controls.contactName.value,
        mainContactEmail: getformconrol3.controls.contactEmail.value,
        mainContactNumber: getformconrol3.controls.contactNumber.value,
        mainAddress: getformconrol3.controls.mainAddress.value,
        contactRequestEmails: getformconrol3.controls.contactReqEmails.value,
        mainPostalCode: getformconrol3.controls.mainPostalCode.value,
        alertEmails: getformconrol3.controls.alertEmails.value,
        alternateContactNumber: getformconrol3.controls.alternateContactNum.value,
        alternateContactName: getformconrol3.controls.alternateContactName.value,
        alternateContactEmail: getformconrol3.controls.alternateContactEmail.value,
        createdBy: getformconrol3.controls.createdBy.value,
        updatedBy: getformconrol3.controls.updatedBy.value,
        isActive: getformconrol3.controls.isActive.value
      },
      setting: {
        isPointOwnLabels: getformconrol4.controls.ownLabels.value,
        isAttachOwnPaperWork: getformconrol4.controls.ownPaperWork.value,
        isAllowWarehouseTab: getformconrol4.controls.warehouseTab.value,
        isServiceLevel: getformconrol4.controls.serviceLevel.value,
        isDeliveryPoint: getformconrol4.controls.delPoint.value,
        isUnpackItems: getformconrol4.controls.unpacked.value,
        isTakePackagingAway: getformconrol4.controls.packageAway.value,
        isAssemble: getformconrol4.controls.assemble.value,
        isDisassemble: getformconrol4.controls.disassemeble.value,
        isCollectDisposal: getformconrol4.controls.collectDisposal.value,
        podDisclaime: getformconrol4.controls.disclaimer.value,
        podLogoUrl: getformconrol4.controls.logoUrl.value,
        isInvoiceForced: getformconrol4.controls.invoiceForced.value,
        isPodWithInvoice: getformconrol4.controls.podInvoice.value,
        logoPath: getformconrol4.controls.logoPath.value
      }
    }
    this.stepperDataService.postStepperData(formData).subscribe((data) => {
      console.log('data', data)
    },
      (error: any) => {
        throw error
      })
  }

}
