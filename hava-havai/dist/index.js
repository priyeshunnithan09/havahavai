"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Airport_1 = require("./entity/Airport");
const app = (0, express_1.default)();
const port = 3000;
(0, typeorm_1.createConnection)().then(async (connection) => {
    app.get('/api/airport', async (req, res) => {
        const iataCode = req.query.iata_code;
        if (!iataCode) {
            res.status(400).json({ error: 'Missing iata_code query parameter' });
            return;
        }
        try {
            const airportRepository = connection.getRepository(Airport_1.Airport);
            const airport = await airportRepository.findOne({
                where: { iata_code: iataCode },
                relations: ['city', 'city.country']
            });
            if (!airport) {
                res.status(404).json({ error: 'Airport not found' });
                return;
            }
            res.json({
                airport: {
                    id: airport.id,
                    icao_code: airport.icao_code,
                    iata_code: airport.iata_code,
                    name: airport.name,
                    type: airport.type,
                    latitude_deg: airport.latitude_deg,
                    longitude_deg: airport.longitude_deg,
                    elevation_ft: airport.elevation_ft,
                    address: {
                        city: {
                            id: airport.city.id,
                            name: airport.city.name,
                            country_id: airport.city.country.id,
                            is_active: airport.city.is_active,
                            lat: airport.city.lat,
                            long: airport.city.long
                        },
                        country: airport.city.country ? {
                            id: airport.city.country.id,
                            name: airport.city.country.name,
                            country_code_two: airport.city.country.country_code_two,
                            country_code_three: airport.city.country.country_code_three,
                            mobile_code: airport.city.country.mobile_code,
                            continent_id: airport.city.country.continent_id
                        } : null
                    }
                }
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}).catch(error => console.log('Error: ', error));
