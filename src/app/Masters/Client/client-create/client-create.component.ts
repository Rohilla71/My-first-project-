import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { CountryService } from '../../Country/country.service';
import { ThemePalette } from '@angular/material/core';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.scss'
})
export class ClientCreateComponent implements OnInit {
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  filteredCountry: Observable<unknown>;
  countryCtrl: FormControl<any>;
  
  constructor(private _formBuilder: FormBuilder,
    public countryService: CountryService
  ) {
    this.GetCountryList();
    this.countryCtrl = new FormControl();
    
    this.filteredCountry = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map((item) =>
        item ? this.filterCountry(item) : this.countryService.countries.slice()
      )
    );
  }

  filterCountry(name: any) {
    
    let arr = this.countryService.countries.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );

    if (arr.length == 1) {
      const getformconrol3: any = this.formArray.get([2])
      getformconrol3.controls['countryId'].setValue(arr[0].id);
      // this.formGroup.controls['countryId'].setValue(arr[0].id);
    }
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }


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
        personalId: [''],
        name: ['', Validators.required],
        countryId: ['', Validators.required],
        contactName: ['', Validators.required],
        contactEmail: [''],
        contactNumber: ['', Validators.required],
        mainAddress: ['', Validators.required],
        contactReqEmails: [''],
        mainPostalCode: ['', Validators.required],
        alertEmails: [''],
        alternateContactNum: [''],
        alternateContactName: [''],
        alternateContactEmail: [''],
        createdBy: [''],
        updatedBy: [''],
        isActive: [false]
      }),
      this._formBuilder.group({
        ownLabels: [false],
        ownPaperWork: [false],
        warehouseTab: [false],
        serviceLevel: [false],
        delPoint: [false],
        unpacked: [false],
        packageAway: [false],
        assemble: [false],
        disassemeble: [false],
        collectDisposal: [false],
        disclaimer: [false],
        logoUrl: [false],
        invoiceForced: [false],
        podInvoice: [false],
        logoPath: ['']
      })
    ])
  });
  isLinear = false;
  // formGroup: any;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  countries: string[] = [
    'India',
    'America',
    'China',
    'Arab',
    'Dubai',
    'Japan',
    'Nepal',
    'England',
    'Canada',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  
  ngOnInit() {
    // this.formGroup = this._formBuilder.group({
    //   formArray: this._formBuilder.array([
    //     this._formBuilder.group({
    //       accNmbr: ['', Validators.required],
    //       accRefrnc: [''],
    //       credLimit: [''],
    //       termId: ['', Validators.required],
    //       address: ['', Validators.required],
    //       postalCode: ['', Validators.required],
    //       email: ['']
    //     }),
    //     this._formBuilder.group({
    //       collctAddress: ['', Validators.required],
    //       collctPostalCode: ['', Validators.required],
    //       warehouseEmail: ['', Validators.required],
    //       categoryId: ['', Validators.required],
    //       fuelSurcharge: [''],
    //       delInstruction: [''],
    //       delStatusId: ['', Validators.required],
    //       dropTime: ['', Validators.required],
    //       itemWeight: ['']
    //     }),
    //     this._formBuilder.group({
    //       personalId: ['', Validators.required],
    //       name: ['', Validators.required],
    //       countryId: ['', Validators.required],
    //       contactName: ['', Validators.required],
    //       contactEmail: [''],
    //       contactNumber: ['', Validators.required],
    //       mainAddress: ['', Validators.required],
    //       contactReqEmails: [''],
    //       mainPostalCode: ['', Validators.required],
    //       alertEmails: ['', Validators.required],
    //       alternateContactNum: [''],
    //       alternateContactName: [''],
    //       alternateContactEmail: [''],
    //       createdBy: ['', Validators.required],
    //       updatedBy: [''],
    //       isActive: ['', Validators.required]
    //     }),
    //     this._formBuilder.group({
    //       ownLabels: ['', Validators.required],
    //       ownPaperWork: [''],
    //       warehouseTab: ['', Validators.required],
    //       serviceLevel: ['', Validators.required],
    //       delPoint: [''],
    //       unpacked: [''],
    //       packageAway: [''],
    //       assemble: [''],
    //       disassemeble: [''],
    //       collectDisposal: ['', Validators.required],
    //       disclaimer: [''],
    //       logoUrl: [''],
    //       invoiceForced: [''],
    //       podInvoice: ['', Validators.required],
    //       logoPath: ['']
    //     })
    //   ])
    // });
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
      countryId: getformconrol3.controls.countryId.value,
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
    console.log(formData);
  //  this.stepperDataService.getStepperData(formData).subscribe((data) => {

   // })
  }
  

  
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];



  GetCountryList() {
    
    this.countryService.GetCountryList().subscribe(p => {
      
      if (p.success == true) {
        this.countryService.countries = p?.data;
      }
    }),
      error => {
        ;
        console.log(error);
      }

  }
}
