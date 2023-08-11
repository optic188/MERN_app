export interface IDiscountConfig {
    name: string,
    title: string,
    value: boolean
}
export const discountConfig = [
    {
        name:'commercialDiscount',
        title: 'Commercial Discount',
        value: false
    },
    {
        name:'strongCarSurcharge',
        title: 'Strong Car Surcharge',
        value: true
    },
]
export const coveragesConfig = [
    {
        name:'bonusProtection',
        title: 'Bonus Protection',
        value: false
    },
    {
        name:'aOPlus',
        title: 'A0+',
        value: false
    },
    {
        name:'glassCoverage',
        title: 'Glass protection',
        value: false
    },
]