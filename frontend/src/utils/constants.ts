export const MALAYSIAN_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
  'Sarawak', 'Selangor', 'Terengganu', 'Kuala Lumpur',
  'Labuan', 'Putrajaya'
];

export const PROPERTY_TYPES = [
  'RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL', 'DEVELOPMENT_LAND'
];

export const LISTING_TYPES = [
  'SALE', 'RENT', 'AUCTION'
];

export const PROPERTY_FEATURES = [
  'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden',
  'Balcony', 'Air Conditioning', 'Furnished', 'Near LRT',
  'Shopping Mall', 'School Nearby', 'Hospital Nearby'
];

export const CURRENCY_FORMAT = {
  style: 'currency' as const,
  currency: 'MYR',
  minimumFractionDigits: 0
};