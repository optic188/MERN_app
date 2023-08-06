import { model, Schema, Model, Document } from 'mongoose';

export interface ITask extends Document {
    task: string;
    assignee: string;
    status: string;
    createDate: Date, 
    updatedDate: Date;
    createdBy: string;
    updatedBy: string;
    timestamps?: {};
}

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
    bonusProtection: Number,
    aOPlus: Number,
    glassCoverage: Number,
    commercialDiscount: Number,
    agentDiscount: Number,
    summerDiscount: Number,
    strongCarSurcharge: Number,
    priceMatch: Number,
    totalSum: Number

})

const InsuranceSchema: Schema = new Schema({
    userName: {type: String, required: true},
    userBirthDate: {type: Date, default: Date.now},
    userCity: {type: String, required: true},
    userVehiclePower: {type: Number, required: true},
    userVoucher: {type: Number, default: Date.now},
    userPriceMatch: {type: Number, required: false},
    userTotalSum: {type: Number, required: false},
    insuranceOption: insuranceOption,
    configurations: [configurations]
});

// export const InsuranceModel: Model<ITask> = model<ITask>('policies', InsuranceSchema);
export const InsuranceModel: Model<any> = model<any>('policies', InsuranceSchema);