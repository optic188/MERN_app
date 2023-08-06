import {InsuranceModel} from "../model/insurance.model";
import {connect} from "../config/db.config";
import {APILogger} from "../logger/api.logger";

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

    async createItem(item) {
        let data = {};
        try {
            let currentUser = await InsuranceModel.findOne({userName:item.userName});
            if(currentUser === null) {
                data = await InsuranceModel.create(item);
            } else {
                const newUser = {...currentUser._doc, ...item}
                console.log('currentUser::', currentUser)
                await InsuranceModel.findByIdAndUpdate(currentUser._id, newUser, { new: true, useFindAndModify: false });
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