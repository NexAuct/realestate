export interface Translation {
  [key: string]: string | Translation;
}

export const translations: { [key: string]: Translation } = {
  en: {
    brand: {
      name: 'RealEstate Malaysia'
    },
    nav: {
      home: 'Home',
      properties: 'Properties',
      agents: 'Agents',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact'
    },
    common: {
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      viewMore: 'View More',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      any: 'Any'
    },
    property: {
      title: 'Title',
      description: 'Description',
      price: 'Price',
      location: 'Location',
      type: 'Property Type',
      status: 'Status',
      features: 'Features',
      amenities: 'Amenities',
      landTitle: 'Land Title',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      rizabMelayu: 'Rizab Melayu',
      rumahMampuMilik: 'Rumah Mampu Milik',
      auction: 'Auction Property',
      search: {
        title: 'Search Properties',
        advancedFilters: 'Advanced Filters',
        specialTypes: 'Special Property Types',
        priceRange: 'Price Range'
      },
      landTitleTypes: {
        GERAN: 'Geran',
        HAKMILIK_SEMENTARA: 'Hakmilik Sementara',
        PAJAKAN: 'Pajakan',
        RIZAB_MELAYU: 'Rizab Melayu'
      },
      propertyTypes: {
        RESIDENTIAL: 'Residential',
        COMMERCIAL: 'Commercial',
        INDUSTRIAL: 'Industrial',
        AGRICULTURAL: 'Agricultural',
        DEVELOPMENT_LAND: 'Development Land'
      },
      propertyStatus: {
        AVAILABLE: 'Available',
        UNDER_CONTRACT: 'Under Contract',
        SOLD: 'Sold',
        AUCTION: 'Auction',
        RUMAH_MAMPU_MILIK: 'Rumah Mampu Milik'
      }
    },
    location: {
      state: 'State',
      district: 'District',
      mukim: 'Mukim',
      postalCode: 'Postal Code',
      lot: 'Lot Number',
      section: 'Section',
      townArea: 'Town Area'
    },
    financial: {
      marketValue: 'Market Value',
      stampDuty: 'Stamp Duty',
      legalFees: 'Legal Fees',
      rpgt: 'Real Property Gains Tax',
      maintenanceFee: 'Maintenance Fee',
      assessmentTax: 'Assessment Tax',
      quitRent: 'Quit Rent',
      priceRange: 'Price Range'
    },
    legal: {
      caveats: 'Caveats',
      encumbrances: 'Encumbrances',
      restrictions: 'Restrictions',
      titleSearch: 'Title Search',
      spAgreement: 'Sale & Purchase Agreement',
      loanAgreement: 'Loan Agreement'
    },
    payment: {
      duitNow: 'DuitNow',
      fpx: 'FPX',
      bankTransfer: 'Bank Transfer',
      deposit: 'Deposit',
      balance: 'Balance',
      escrow: 'Escrow'
    }
  },
  bm: {
    brand: {
      name: 'RealEstate Malaysia'
    },
    nav: {
      home: 'Laman Utama',
      properties: 'Hartanah',
      agents: 'Ejen',
      about: 'Tentang Kami',
      blog: 'Blog',
      contact: 'Hubungi'
    },
    common: {
      search: 'Cari',
      filter: 'Tapis',
      sort: 'Susun',
      submit: 'Hantar',
      cancel: 'Batal',
      save: 'Simpan',
      edit: 'Sunting',
      delete: 'Padam',
      loading: 'Sedang dimuatkan...',
      error: 'Ralat telah berlaku',
      success: 'Berjaya',
      viewMore: 'Lihat Lagi',
      back: 'Kembali',
      next: 'Seterusnya',
      previous: 'Sebelumnya',
      any: 'Semua'
    },
    property: {
      title: 'Tajuk',
      description: 'Penerangan',
      price: 'Harga',
      location: 'Lokasi',
      type: 'Jenis Hartanah',
      status: 'Status',
      features: 'Ciri-ciri',
      amenities: 'Kemudahan',
      landTitle: 'Hakmilik Tanah',
      bedrooms: 'Bilik Tidur',
      bathrooms: 'Bilik Air',
      rizabMelayu: 'Rizab Melayu',
      rumahMampuMilik: 'Rumah Mampu Milik',
      auction: 'Hartanah Lelong',
      search: {
        title: 'Cari Hartanah',
        advancedFilters: 'Penapis Lanjutan',
        specialTypes: 'Jenis Hartanah Khas',
        priceRange: 'Julat Harga'
      },
      landTitleTypes: {
        GERAN: 'Geran',
        HAKMILIK_SEMENTARA: 'Hakmilik Sementara',
        PAJAKAN: 'Pajakan',
        RIZAB_MELAYU: 'Rizab Melayu'
      },
      propertyTypes: {
        RESIDENTIAL: 'Kediaman',
        COMMERCIAL: 'Komersial',
        INDUSTRIAL: 'Perindustrian',
        AGRICULTURAL: 'Pertanian',
        DEVELOPMENT_LAND: 'Tanah Pembangunan'
      },
      propertyStatus: {
        AVAILABLE: 'Tersedia',
        UNDER_CONTRACT: 'Dalam Kontrak',
        SOLD: 'Terjual',
        AUCTION: 'Lelong',
        RUMAH_MAMPU_MILIK: 'Rumah Mampu Milik'
      }
    },
    location: {
      state: 'Negeri',
      district: 'Daerah',
      mukim: 'Mukim',
      postalCode: 'Poskod',
      lot: 'Nombor Lot',
      section: 'Seksyen',
      townArea: 'Kawasan Bandar'
    },
    financial: {
      marketValue: 'Nilai Pasaran',
      stampDuty: 'Duti Setem',
      legalFees: 'Yuran Guaman',
      rpgt: 'Cukai Keuntungan Harta Tanah',
      maintenanceFee: 'Yuran Penyelenggaraan',
      assessmentTax: 'Cukai Taksiran',
      quitRent: 'Cukai Tanah',
      priceRange: 'Julat Harga'
    },
    legal: {
      caveats: 'Kaveat',
      encumbrances: 'Bebanan',
      restrictions: 'Sekatan',
      titleSearch: 'Carian Hakmilik',
      spAgreement: 'Perjanjian Jual Beli',
      loanAgreement: 'Perjanjian Pinjaman'
    },
    payment: {
      duitNow: 'DuitNow',
      fpx: 'FPX',
      bankTransfer: 'Pindahan Bank',
      deposit: 'Deposit',
      balance: 'Baki',
      escrow: 'Eskrow'
    }
  }
};
