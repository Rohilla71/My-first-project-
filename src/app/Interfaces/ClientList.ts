export interface ClientListResponse {
    success: boolean;
    message: string;
    data:    Datum[];
    errors:  any[];
}

export interface Datum {
    accountDetails:  AccountDetails;
    deliveryDetails: DeliveryDetails;
    personalDetails: PersonalDetails;
    setting:         Setting;
}

export interface AccountDetails {
    accountNumber:     string;
    accountReference:  string;
    creditLimit:       number;
    invoiceTermId:     number;
    invoiceAddress:    string;
    invoicePostalCode: string;
    invoiceEmails:     string;
}

export interface DeliveryDetails {
    collectionAddress:           string;
    collectionPostalCode:        string;
    warehouseContactEmails:      string;
    productChargeCategoryIds:    string;
    fuleSurchargePercent:        number;
    defaultDeliveryInstructions: string;
    defaultDeliveryStatusId:     number;
    defaultDropTime:             Date;
    defaultItemWeight:           number;
}

export interface PersonalDetails {
    id:                     number;
    name:                   string;
    countryId:              number;
    mainContactName:        string;
    mainContactEmail:       string;
    mainContactNumber:      string;
    mainAddress:            string;
    contactRequestEmails:   string;
    mainPostalCode:         null | string;
    alertEmails:            string;
    alternateContactNumber: string;
    alternateContactName:   string;
    alternateContactEmail:  string;
    createdBy:              number;
    updatedBy:              number;
    isActive:               boolean;
}

export interface Setting {
    isPointOwnLabels:     boolean;
    isAttachOwnPaperWork: boolean;
    isAllowWarehouseTab:  boolean;
    isServiceLevel:       boolean;
    isDeliveryPoint:      boolean;
    isUnpackItems:        boolean;
    isTakePackagingAway:  boolean;
    isAssemble:           boolean;
    isDisassemble:        boolean;
    isCollectDisposal:    boolean;
    podDisclaimer:        string;
    podLogoUrl:           string;
    isInvoiceForced:      boolean;
    isPodWithInvoice:     boolean;
    logoPath:             string;
}
