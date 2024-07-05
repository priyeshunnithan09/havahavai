import { DataSource } from 'typeorm';
import { Airport } from './entity/Airport';
import { City } from './entity/City';
import { Country } from './entity/Country';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase',
  synchronize: true,
  logging: false,
  entities: [Airport, City, Country],
  migrations: [],
  subscribers: [],
});
