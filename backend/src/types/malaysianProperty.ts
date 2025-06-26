export enum LandTitleType {
  GERAN = 'GERAN',
  HAKMILIK_SEMENTARA = 'HAKMILIK_SEMENTARA',
  PAJAKAN = 'PAJAKAN',
  RIZAB_MELAYU = 'RIZAB_MELAYU'
}

export enum PropertyCategory {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL',
  AGRICULTURAL = 'AGRICULTURAL',
  DEVELOPMENT_LAND = 'DEVELOPMENT_LAND'
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  UNDER_CONTRACT = 'UNDER_CONTRACT',
  SOLD = 'SOLD',
  AUCTION = 'AUCTION',
  RUMAH_MAMPU_MILIK = 'RUMAH_MAMPU_MILIK'
}

export interface MalaysianLocation {
  state: string;
  district: string;
  mukim: string;
  postalCode: string;
  lot: string;
  section?: string;
  townArea?: string;
}

export interface PropertyValuation {
  marketValue: number;
  valuationDate: Date;
  jpphReference?: string;
  valuationType: 'JPPH' | 'INDEPENDENT' | 'BANK';
}

export interface RPGTDetails {
  acquisitionDate: Date;
  acquisitionPrice: number;
  disposalPrice?: number;
  exemptionCategory?: string;
  calculatedTax?: number;
}

export interface StampDutyDetails {
  calculatedDuty: number;
  dutyCategory: string;
  exemptionStatus?: string;
  eStampingReference?: string;
}
