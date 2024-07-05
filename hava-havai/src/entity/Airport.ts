import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { City } from './City';

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  icao_code!: string;

  @Column()
  iata_code!: string;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column('decimal')
  latitude_deg!: number;

  @Column('decimal')
  longitude_deg!: number;

  @Column('int')
  elevation_ft!: number;

  @ManyToOne(() => City, (city) => city.airports)
  city!: City;

  constructor(
    id: number,
    icao_code: string,
    iata_code: string,
    name: string,
    type: string,
    latitude_deg: number,
    longitude_deg: number,
    elevation_ft: number,
    city: City
  ) {
    this.id = id;
    this.icao_code = icao_code;
    this.iata_code = iata_code;
    this.name = name;
    this.type = type;
    this.latitude_deg = latitude_deg;
    this.longitude_deg = longitude_deg;
    this.elevation_ft = elevation_ft;
    this.city = city;
  }
}
