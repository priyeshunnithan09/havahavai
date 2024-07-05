"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Airport_1 = require("./entity/Airport");
const City_1 = require("./entity/City");
const Country_1 = require("./entity/Country");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'yourusername',
    password: 'yourpassword',
    database: 'yourdatabase',
    synchronize: true,
    logging: false,
    entities: [Airport_1.Airport, City_1.City, Country_1.Country],
    migrations: [],
    subscribers: [],
});
