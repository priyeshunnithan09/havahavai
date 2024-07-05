"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airport = void 0;
const typeorm_1 = require("typeorm");
const City_1 = require("./City");
let Airport = class Airport {
    constructor(id, icao_code, iata_code, name, type, latitude_deg, longitude_deg, elevation_ft, city) {
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
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Airport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "icao_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "iata_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Airport.prototype, "latitude_deg", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Airport.prototype, "longitude_deg", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Airport.prototype, "elevation_ft", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => City_1.City, (city) => city.airports),
    __metadata("design:type", City_1.City)
], Airport.prototype, "city", void 0);
Airport = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, String, String, String, String, Number, Number, Number, City_1.City])
], Airport);
exports.Airport = Airport;
