import { model, Schema, Model, Document } from 'mongoose';
import { Iconfigurations, Icoverages, Idiscounts, IUser } from '../../sharedTypes';

const coverages: Schema = new Schema({
    bonusProtection: Number,
    aOPlus: Number,
    glassCoverage: Number
})
const discounts: Schema = new Schema({
    commercialDiscount: Number,
    agentDiscount: Number,
    summerDiscount: Number,
    strongCarSurcharge: Number
})

const insuranceOption: Schema = new Schema({
    coverages:coverages,
    discounts: discounts
})
const configurations: Schema = new Schema({
    arrayOfMaps: [{
        type: Map,
        of: Number, // Specify the value type (string in this case)
    }],
})


export interface IExtendedUser extends IUser, Document {
    _doc: {}
}
const InsuranceSchema: Schema = new Schema({
    userName: {type: String, required: true},
    userBirthDate: {type: Date, default: Date.now},
    userCity: {type: String, required: true},
    userVehiclePower: {type: Number, required: true},
    userVoucher: {type: Number, default: Date.now},
    userPriceMatch: {type: Number, required: false},
    userTotalSum: {type: Number, required: false},
    insuranceOption: insuranceOption,
    configurations: [{
        type: Map,
        of: Number, // Specify the value type (string in this case)
    }],
});

export const InsuranceModel: Model<IExtendedUser> = model<IExtendedUser>('policies', InsuranceSchema);

const prices = new Schema({
    age: Number,
    price: Number
})

const priceRelations: Schema = new Schema([prices])

export interface IPrices extends Document {
    age: number,
    price: number
}

export const PriceRelationModel: Model<IPrices> = model<IPrices>('price_relation', priceRelations);