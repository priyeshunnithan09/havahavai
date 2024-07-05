import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { Airport } from './entity/Airport';
import { City } from './entity/City';
import { Country } from './entity/Country';

const app = express();
const port = 3000;

createConnection().then(async connection => {
  app.get('/api/airport', async (req: Request, res: Response) => {
    const iataCode = req.query.iata_code as string;

    if (!iataCode) {
      res.status(400).json({ error: 'Missing iata_code query parameter' });
      return;
    }

    try {
      const airportRepository = connection.getRepository(Airport);
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
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}).catch(error => console.log('Error: ', error));
