export interface VenueDto {
  weddingId: string;
  venueName: string;
  yearPrice: string;
  hours: number;
  rentServicePrice: number;
  civilDescription: string;
  corkage: boolean;
  platePrice: number;
  plateUpgradePrice: number;
  alcoholPackagePrice: number;
  alcoholUpgradePrice: number;
  lateNightSnackPrice: number;
  extraHourPrice: number;
  valetParkingPrice: number;
  rsvCharge: number;
  guarantyDeposit: number;
}

type VenueRow = {
  wedding_id: string;
  venue_name: string;
  year_price: string;
  hours: number;
  rent_service_price: number;
  civil_description: string;
  corkage: boolean;
  plate_price: number;
  plate_upgrade_price: number;
  alcohol_package_price: number;
  alcohol_upgrade_price: number;
  late_night_snack_price: number;
  extra_hour_price: number;
  valet_parking_price: number;
  rsv_charge: number;
  guaranty_deposit: number;
};

export function mapVenueDtoToRow(dto: VenueDto): VenueRow {
  return {
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

export function mapVenueRowToDto(row: VenueRow): VenueDto {
  return {
    weddingId: row.wedding_id,
    venueName: row.venue_name,
    yearPrice: row.year_price,
    hours: row.hours,
    rentServicePrice: row.rent_service_price,
    civilDescription: row.civil_description,
    corkage: row.corkage,
    platePrice: row.plate_price,
    plateUpgradePrice: row.plate_upgrade_price,
    alcoholPackagePrice: row.alcohol_package_price,
    alcoholUpgradePrice: row.alcohol_upgrade_price,
    lateNightSnackPrice: row.late_night_snack_price,
    extraHourPrice: row.extra_hour_price,
    valetParkingPrice: row.valet_parking_price,
    rsvCharge: row.rsv_charge,
    guarantyDeposit: row.guaranty_deposit,
  };
}
