import {IUser} from "../../sharedTypes";

export const calculateAgeFromBirthdate = (birthdateISO: string):number => {
    const birthdate = new Date(birthdateISO);
    const currentDate = new Date();

    const ageInMilliseconds = currentDate.getTime() - birthdate.getTime();
    const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000); // Assuming an average year length of 365 days

    return Math.floor(ageInYears);
}
export const calculateInsuranceConfiguration = (data: IUser)=> {
    let discounts = data.insuranceOption.discounts
    let res:Record<any, any> = {'Basic price':data.userPriceMatch }
    let totalSum = data.userPriceMatch
    let coverageAmount = 0;
    if(discounts.strongCarSurcharge === 1 && Number(data.userVehiclePower) > 100) {
        const discountAmount = (data.userPriceMatch * 10) / 100;
        res['Strong Car Surcharge'] = discountAmount
        totalSum = totalSum + data.userPriceMatch*0.1
    }
    if(discounts.commercialDiscount) {
        const discountAmount = (data.userPriceMatch * 10) / 100;
        res['Commercial Discount'] = discountAmount
        totalSum = totalSum - discountAmount
    }
    if(discounts.agentDiscount) {
        const discountAmount = (coverageAmount * 10) / 100;
        res['Adviser discount -'] = discountAmount
        totalSum = totalSum - discountAmount
    }
    if(discounts.summerDiscount) {
        const discountAmount = (totalSum * 5) / 100;
        res['Vip discount -'] = discountAmount
        totalSum = totalSum - discountAmount
    }
    if(data.userVoucher) {
        res['Voucher'] = data.userVoucher
        const discountAmount = data.userVoucher;
        totalSum = totalSum - discountAmount
    }
    res['totalSum'] = totalSum
    return {
        ...data,
        userTotalSum:totalSum,
        configurations: [...data.configurations, res]
    }
}