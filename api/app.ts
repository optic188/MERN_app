import * as bodyParser from "body-parser";
const path = require('path');
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { InsuranceController } from "./controller/insurance.controller";

class App {
    public express: express.Application;
    public logger: APILogger;
    public insuranceController: InsuranceController;
    

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        this.insuranceController = new InsuranceController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(path.join(__dirname, '../ui/build')));
    }

    private routes(): void {

        this.express.get('/api/insuranceItem', (req, res) => {
            this.insuranceController.getInsuranceItem().then(data => res.json(data));
        });
        
        this.express.post('/api/createInsuranceItem', (req, res) => {
            console.log(req.body);
            this.insuranceController.createInsuranceItem(req.body.data).then(data => res.json(data));
        });
        
        this.express.put('/api/insuranceItem/update', (req, res) => {
            this.insuranceController.updateInsuranceItem(req.body.data).then(data => res.json(data));
        });

        this.express.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, '../ui/build/index.html'));
        });


        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;