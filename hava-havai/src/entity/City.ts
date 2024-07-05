import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Country } from './Country';
import { Airport } from './Airport';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal')
  lat!: number;

  @Column('decimal')
  long!: number;

  @Column()
  is_active!: boolean;

  @ManyToOne(() => Country, (country) => country.cities)
  country!: Country;

  @OneToMany(() => Airport, (airport) => airport.city)
  airports!: Airport[];

  constructor(id: number, name: string, lat: number, long: number, is_active: boolean, country: Country, airports: Airport[]) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.long = long;
    this.is_active = is_active;
    this.country = country;
    this.airports = airports;
  }
}
