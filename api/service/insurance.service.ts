import {InsuranceModel, PriceRelationModel} from "../model/insurance.model";
import {connect} from "../config/db.config";
import {APILogger} from "../logger/api.logger";
import {prices} from './mocks';
import { calculateAgeFromBirthdate } from './utils'
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
    async createItem(item) {
        let data = {};
        try {
             // was used once, to initial filling the PriceRelationModel model with data
            // await this.fillPrices()
            if(!item.userPriceMatch) {
                const userAge = calculateAgeFromBirthdate(item.userBirthDate)
                console.log('userAge', userAge);
                const priceMatch = await PriceRelationModel.findOne({age:userAge })
                data = {...data, userPriceMatch:priceMatch.price }
                item = {...item, userPriceMatch:priceMatch.price }
            }
            let currentUser = await InsuranceModel.findOne({userName:item.userName});
            if(currentUser === null) {
                const tempData = await InsuranceModel.create(item);
                data = {...data, ...tempData }
            } else {
                const newUser = {...currentUser._doc, ...item}
                console.log('currentUser::', currentUser)
                data = await InsuranceModel.findByIdAndUpdate(currentUser._id, newUser, { new: true, useFindAndModify: false });
                // console.log('item::', item)
            }


        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateItem(item) {
        let data = {};
        try {
            data = await InsuranceModel.findOneAndUpdate(item);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async resetItem(itemId) {
        // return await this.itemRepository.resetItem(itemId);
    }

}