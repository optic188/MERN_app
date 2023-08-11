import {IUser} from "../../sharedTypes";

// Check the user age
export const calculateAgeFromBirthdate = (birthdateISO: string):number => {
    const birthdate = new Date(birthdateISO);
    const currentDate = new Date();

    const ageInMilliseconds = currentDate.getTime() - birthdate.getTime();
    const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000); // Assuming an average year length of 365 days

    return Math.floor(ageInYears);
}
// General calculations
export const calculateInsuranceConfiguration = (data: IUser)=> {
    let discounts = data.insuranceOption.discounts
    let covereges = data.insuranceOption.coverages
    const userAge = calculateAgeFromBirthdate(data.userBirthDate)
    let res:Record<any, any> = {'Basic price':data.userPriceMatch }
    let totalSum = data.userPriceMatch
    let coverageAmount = 0;
    if(covereges?.bonusProtection) {
        const discountAmount = (data.userPriceMatch * 12) / 100;
        res['Bonus Protection'] = discountAmount
        coverageAmount += discountAmount
        totalSum = totalSum + discountAmount
    }
    if(covereges?.aOPlus) {
        const discountAmount = userAge < 30 ? 55 : 105;
        res['AO+'] = discountAmount
        totalSum = totalSum + discountAmount
    }
    if(covereges?.glassCoverage) {
        const discountAmount = (data.userVehiclePower*80)/100;
        res['Glass Protection'] = discountAmount
        totalSum = totalSum + discountAmount
    }
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