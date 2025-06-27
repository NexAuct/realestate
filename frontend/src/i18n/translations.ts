export interface Translation {
  [key: string]: string | Translation;
}

export const translations: Record<'en' | 'bm', Translation> = {
  en: {
    brand: {
      name: 'MyRealEstate'
    },
    common: {
      search: 'Search',
      filter: 'Filter',
      reset: 'Reset',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      loading: 'Loading...',
      error: 'Error occurred',
      success: 'Success',
      any: 'Any'
    },
    navigation: {
      home: 'Home',
      properties: 'Properties',
      auctions: 'Auctions',
      agents: 'Agents',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard'
    },
    auction: {
      title: 'Property Auctions',
      liveAuction: 'Live Auction',
      currentBid: 'Current Bid',
      reservePrice: 'Reserve Price',
      timeRemaining: 'Time Remaining',
      placeBid: 'Place Bid',
      bidAmount: 'Bid Amount',
      bidHistory: 'Bid History',
      totalBidders: 'Total Bidders',
      auctionEnded: 'Auction Ended',
      winner: 'Winner',
      loading: 'Loading auction data...',
      connected: 'Connected to live auction',
      disconnected: 'Connection lost',
      bidTooLow: 'Bid amount must be higher than current bid',
      kycPending: 'KYC verification pending',
      bidderBlocked: 'Bidder account blocked',
      verified: 'Verified',
      auctionTypes: {
        lelong: 'Lelong',
        distressed: 'Distressed Property',
        government: 'Government Auction',
        bank: 'Bank Auction'
      }
    },
    property: {
      search: {
        title: 'Property Search',
        advancedFilters: 'Advanced Filters',
        specialTypes: 'Special Property Types'
      },
      type: 'Property Type',
      landTitle: 'Land Title',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      price: 'Price',
      priceRange: 'Price Range',
      location: 'Location',
      description: 'Description',
      features: 'Features',
      rizabMelayu: 'Rizab Melayu',
      rumahMampuMilik: 'Rumah Mampu Milik',
      auction: 'Auction Property',
      propertyTypes: {
        RESIDENTIAL: 'Residential',
        COMMERCIAL: 'Commercial',
        INDUSTRIAL: 'Industrial',
        AGRICULTURAL: 'Agricultural',
        DEVELOPMENT_LAND: 'Development Land'
      },
      landTitleTypes: {
        GERAN: 'Geran',
        HAKMILIK_SEMENTARA: 'Hakmilik Sementara',
        PAJAKAN: 'Pajakan',
        RIZAB_MELAYU: 'Rizab Melayu'
      }
    },
    location: {
      state: 'State',
      district: 'District',
      mukim: 'Mukim',
      address: 'Address'
    },
    financial: {
      priceRange: 'Price Range',
      downPayment: 'Down Payment',
      monthlyPayment: 'Monthly Payment',
      loanAmount: 'Loan Amount',
      interestRate: 'Interest Rate',
      loanTerm: 'Loan Term',
      rpgt: 'RPGT',
      stampDuty: 'Stamp Duty',
      legalFees: 'Legal Fees'
    },
    compliance: {
      kycVerification: 'KYC Verification',
      amlCheck: 'AML Check',
      titleVerification: 'Title Verification',
      complianceStatus: 'Compliance Status',
      approved: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected'
    }
  },
  bm: {
    brand: {
      name: 'MyRealEstate'
    },
    common: {
      search: 'Cari',
      filter: 'Tapis',
      reset: 'Set Semula',
      submit: 'Hantar',
      cancel: 'Batal',
      save: 'Simpan',
      edit: 'Edit',
      delete: 'Padam',
      view: 'Lihat',
      loading: 'Memuatkan...',
      error: 'Ralat berlaku',
      success: 'Berjaya',
      any: 'Mana-mana'
    },
    navigation: {
      home: 'Utama',
      properties: 'Hartanah',
      auctions: 'Lelongan',
      agents: 'Ejen',
      about: 'Tentang',
      contact: 'Hubungi',
      login: 'Log Masuk',
      register: 'Daftar',
      dashboard: 'Papan Pemuka'
    },
    auction: {
      title: 'Lelongan Hartanah',
      liveAuction: 'Lelongan Langsung',
      currentBid: 'Bida Semasa',
      reservePrice: 'Harga Rizab',
      timeRemaining: 'Masa Berbaki',
      placeBid: 'Buat Bidaan',
      bidAmount: 'Jumlah Bidaan',
      bidHistory: 'Sejarah Bidaan',
      totalBidders: 'Jumlah Pembida',
      auctionEnded: 'Lelongan Tamat',
      winner: 'Pemenang',
      loading: 'Memuatkan data lelongan...',
      connected: 'Disambungkan ke lelongan langsung',
      disconnected: 'Sambungan terputus',
      bidTooLow: 'Jumlah bidaan mesti lebih tinggi daripada bidaan semasa',
      kycPending: 'Pengesahan KYC dalam proses',
      bidderBlocked: 'Akaun pembida disekat',
      verified: 'Disahkan',
      auctionTypes: {
        lelong: 'Lelong',
        distressed: 'Hartanah Bermasalah',
        government: 'Lelongan Kerajaan',
        bank: 'Lelongan Bank'
      }
    },
    property: {
      search: {
        title: 'Carian Hartanah',
        advancedFilters: 'Penapis Lanjutan',
        specialTypes: 'Jenis Hartanah Khas'
      },
      type: 'Jenis Hartanah',
      landTitle: 'Hakmilik Tanah',
      bedrooms: 'Bilik Tidur',
      bathrooms: 'Bilik Air',
      price: 'Harga',
      priceRange: 'Julat Harga',
      location: 'Lokasi',
      description: 'Penerangan',
      features: 'Ciri-ciri',
      rizabMelayu: 'Rizab Melayu',
      rumahMampuMilik: 'Rumah Mampu Milik',
      auction: 'Hartanah Lelongan',
      propertyTypes: {
        RESIDENTIAL: 'Kediaman',
        COMMERCIAL: 'Komersial',
        INDUSTRIAL: 'Perindustrian',
        AGRICULTURAL: 'Pertanian',
        DEVELOPMENT_LAND: 'Tanah Pembangunan'
      },
      landTitleTypes: {
        GERAN: 'Geran',
        HAKMILIK_SEMENTARA: 'Hakmilik Sementara',
        PAJAKAN: 'Pajakan',
        RIZAB_MELAYU: 'Rizab Melayu'
      }
    },
    location: {
      state: 'Negeri',
      district: 'Daerah',
      mukim: 'Mukim',
      address: 'Alamat'
    },
    financial: {
      priceRange: 'Julat Harga',
      downPayment: 'Wang Pendahuluan',
      monthlyPayment: 'Bayaran Bulanan',
      loanAmount: 'Jumlah Pinjaman',
      interestRate: 'Kadar Faedah',
      loanTerm: 'Tempoh Pinjaman',
      rpgt: 'RPGT',
      stampDuty: 'Duti Setem',
      legalFees: 'Yuran Guaman'
    },
    compliance: {
      kycVerification: 'Pengesahan KYC',
      amlCheck: 'Semakan AML',
      titleVerification: 'Pengesahan Hakmilik',
      complianceStatus: 'Status Pematuhan',
      approved: 'Diluluskan',
      pending: 'Dalam Proses',
      rejected: 'Ditolak'
    }
  }
};