import {InsuranceModel, PriceRelationModel} from "../model/insurance.model";
import {connect} from "../config/db.config";
import {APILogger} from "../logger/api.logger";
import {prices} from './mocks';
import {calculateAgeFromBirthdate, calculateInsuranceConfiguration} from './utils'
import {IUser} from "../../sharedTypes";

export class InsuranceService {
    private logger: APILogger;
    constructor() {
        connect();
        this.logger = new APILogger()
    }

    async getItem() {
        const items = await InsuranceModel.find({});
        console.log('data:::', items);
        return items;
    }
    async fillPrices() {
        try {
            await PriceRelationModel.create(prices)
        } catch(err) {
            console.log(err)
        }
    }
    async createItem(item:IUser) {
        let calculatedItem = {}
        try {
             // was used once, to initial filling the PriceRelationModel model with data
            // await this.fillPrices()
            console.log('createItem', item);
            if(!item.userPriceMatch || item.userPriceMatch === 0) {
                const userAge = calculateAgeFromBirthdate(item.userBirthDate)
                const priceMatch = await PriceRelationModel.findOne({age:userAge })
                item = {...item, userPriceMatch: priceMatch.price }
            }
            calculatedItem = calculateInsuranceConfiguration(item)
            let currentUser = await InsuranceModel.findOne({userName:item.userName});
            if(currentUser === null) {
                return  await InsuranceModel.create(calculatedItem);
            } else {
                const newUser = {...currentUser._doc, ...calculatedItem}
                return  await InsuranceModel.findByIdAndUpdate(currentUser._id, newUser, { new: true, useFindAndModify: false });
            }

        } catch(err) {
            this.logger.error('Error::' + err);
        }
    }

    async updateItem(item) {
        try {
            const calculatedItem = calculateInsuranceConfiguration(item)
            const newUser = {...item._doc, ...calculatedItem}
            console.log('calculatedItem',newUser)
            return  await InsuranceModel.findOneAndUpdate({userName:item.userName}, newUser, {new:true});

        } catch(err) {
            this.logger.error('Error::' + err);
        }
    }

    async resetItem(itemId) {
        // return await this.itemRepository.resetItem(itemId);
    }

}