export interface VenueDto {
    id: string;
    weddingId: string;
    venueName: string;
    yearPrice: string;
    hours: Int16Array;
    rentServicePrice: Float32Array;
    civilDescription: string;
    corkage: boolean;
    platePrice: Float32Array;
    plateUpgradePrice: Float32Array;
    alcoholPackagePrice: Float32Array;
    alcoholUpgradePrice: Float32Array;
    lateNightSnackPrice: Float32Array;
    extraHourPrice: Float32Array;
    valetParkingPrice: Float32Array;
    rsvCharge: Float32Array;
    guarantyDeposit: Float32Array;
}

type VenueRow = {
    id: string;
    wedding_id: string;
    venue_name: string;
    year_price: string;
    hours: Int16Array;
    rent_service_price: Float32Array;
    civil_description: string;
    corkage: boolean;
    plate_price: Float32Array;
    plate_upgrade_price: Float32Array;
    alcohol_package_price: Float32Array;
    alcohol_upgrade_price: Float32Array;
    late_night_snack_price: Float32Array;
    extra_hour_price: Float32Array;
    valet_parking_price: Float32Array;    
    rsv_charge: Float32Array;
    guaranty_deposit: Float32Array;
};


export function mapVenueDtoToRow(dto: VenueDto): VenueRow {
  return {
    id: dto.id,
    wedding_id: dto.weddingId,
    venue_name: dto.venueName,
    year_price: dto.yearPrice,
    hours: dto.hours,
    rent_service_price: dto.rentServicePrice,
    civil_description: dto.civilDescription,
    corkage: dto.corkage,
    plate_price: dto.platePrice,
    plate_upgrade_price: dto.plateUpgradePrice,
    alcohol_package_price: dto.alcoholPackagePrice,
    alcohol_upgrade_price: dto.alcoholUpgradePrice,
    late_night_snack_price: dto.lateNightSnackPrice,
    extra_hour_price: dto.extraHourPrice,
    valet_parking_price: dto.valetParkingPrice,
    rsv_charge: dto.rsvCharge,
    guaranty_deposit: dto.guarantyDeposit,
  };
}   