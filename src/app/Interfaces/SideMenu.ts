export interface SideMenuResponse {
    success: boolean;
    message: string;
    data:    SideMenu[];
    errors:  any[];
}

export interface SideMenu {
    id:             number;
    name:           string;
    submenuDetails: SubmenuDetail[];
    isActive:       boolean;
    parentId:       number;
    sequence:       number;
    iconUrl:        null;
    iconClass:      string;
    createdBy:      number;
    updatedBy:      number;
    nevigateUrl:    string;
}

export interface SubmenuDetail {
    id:        number;
    name:      string;
    parentId:  number;
    sequence:  number;
    iconUrl:   null;
    iconClass: string;
    navigateUrl:   string;
    isActive:       boolean;
}