export interface Iconfigurations {
    bonusProtection: number,
    aOPlus: number,
    glassCoverage: number,
    commercialDiscount: number,
    agentDiscount: number,
    summerDiscount: number,
    strongCarSurcharge: number,
    priceMatch: number,
    totalSum: number
}
export interface Icoverages {
    bonusProtection: number,
    aOPlus: number,
    glassCoverage: number
}
export interface Idiscounts {
    commercialDiscount?: number,
    agentDiscount?: number,
    summerDiscount?: number,
    strongCarSurcharge: number
}

type IinsuranceOptionPartial = Partial<{coverages:Icoverages, discounts: Idiscounts}>
export interface IUser {
    userName: string,
    userBirthDate: string,
    userCity: string,
    userVehiclePower: number,
    userVoucher: number,
    userPriceMatch: number,
    userTotalSum: number,
    insuranceOption: IinsuranceOptionPartial,
    configurations: any[] | [],
}