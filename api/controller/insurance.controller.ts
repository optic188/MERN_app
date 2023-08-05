import { APILogger } from '../logger/api.logger';
import { InsuranceService } from '../service/insurance.service';

export class InsuranceController {

    private insuranceService: InsuranceService;
    private logger: APILogger;

    constructor() {
        this.insuranceService = new InsuranceService();
        this.logger = new APILogger()
    }

    async getInsuranceItem() {
        this.logger.info('Controller: get', null)
        return await this.insuranceService.getItem();
    }

    async createInsuranceItem(data) {
        this.logger.info('Controller: create', data);
        return await this.insuranceService.createItem(data);
    }

    async updateInsuranceItem(data) {
        this.logger.info('Controller: update', data);
        return await this.insuranceService.updateItem(data);
    }

    async resetData(taskId) {
        this.logger.info('Controller: deleteTask', taskId);
    }
}