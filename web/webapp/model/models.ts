export interface User {
    USERID: number;
    FNAME: string;
    LNAME: string;
    EMAIL: string;
    TYPE: 'CUSTOMER' | 'OWNER';
    PASSWORD: string;
    GENDER: 'FEMALE' | 'MEN';
    DOB: number;
}

export interface ChargingStation {
    STATIONID: number;
    LOCATION: string;
    PRICE: number;
    CONTACT: string;
    USER_USERID: number;
}
