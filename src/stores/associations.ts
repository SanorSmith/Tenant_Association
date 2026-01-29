import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Association } from '@/types'

export const useAssociationsStore = defineStore('associations', () => {
  const associations = ref<Association[]>([])
  const currentAssociation = ref<Association | null>(null)

  const initDemoData = () => {
    associations.value = [
      {
        id: 'assoc-1',
        name: 'Solhöjden BRF',
        address: 'Solvägen 12',
        city: 'Stockholm',
        postalCode: '112 34',
        organizationNumber: '556123-4567',
        totalApartments: 48,
        totalMembers: 112,
        description: 'En trivsam bostadsrättsförening i hjärtat av Stockholm med närhet till parker och kommunikationer.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        boardMembers: ['user-1', 'user-2', 'user-3'],
        contactEmail: 'info@solhojden.se',
        contactPhone: '+46 8 123 456',
        website: 'www.solhojden.se'
      },
      {
        id: 'assoc-2',
        name: 'Parkgatan BRF',
        address: 'Parkgatan 45',
        city: 'Göteborg',
        postalCode: '411 38',
        organizationNumber: '556234-5678',
        totalApartments: 62,
        totalMembers: 145,
        description: 'Modern bostadsrättsförening med gröna ytor och gemensamma faciliteter.',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        boardMembers: ['user-4', 'user-5'],
        contactEmail: 'info@parkgatan.se',
        contactPhone: '+46 31 234 567',
        website: 'www.parkgatan.se'
      },
      {
        id: 'assoc-3',
        name: 'Sjöutsikten BRF',
        address: 'Strandvägen 78',
        city: 'Malmö',
        postalCode: '211 22',
        organizationNumber: '556345-6789',
        totalApartments: 35,
        totalMembers: 82,
        description: 'Exklusiv förening med havsutsikt och moderna lägenheter.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        boardMembers: ['user-6', 'user-7', 'user-8'],
        contactEmail: 'info@sjoutsikten.se',
        contactPhone: '+46 40 345 678',
        website: 'www.sjoutsikten.se'
      },
      {
        id: 'assoc-4',
        name: 'Centrumhuset BRF',
        address: 'Kungsgatan 23',
        city: 'Uppsala',
        postalCode: '753 10',
        organizationNumber: '556456-7890',
        totalApartments: 28,
        totalMembers: 64,
        description: 'Centralt belägen förening med närhet till alla bekvämligheter.',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        boardMembers: ['user-9'],
        contactEmail: 'info@centrumhuset.se',
        contactPhone: '+46 18 456 789'
      },
      {
        id: 'assoc-5',
        name: 'Lundagården BRF',
        address: 'Lundavägen 56',
        city: 'Lund',
        postalCode: '222 22',
        organizationNumber: '556567-8901',
        totalApartments: 54,
        totalMembers: 128,
        description: 'Familjevänlig förening med lekplatser och gemensamma aktiviteter.',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
        boardMembers: ['user-10', 'user-11'],
        contactEmail: 'info@lundagarden.se',
        contactPhone: '+46 46 567 890',
        website: 'www.lundagarden.se'
      },
      {
        id: 'assoc-6',
        name: 'Rosengården BRF',
        address: 'Rosenvägen 89',
        city: 'Helsingborg',
        postalCode: '252 20',
        organizationNumber: '556678-9012',
        totalApartments: 42,
        totalMembers: 98,
        description: 'Charmig förening med vackra trädgårdar och mysig atmosfär.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        boardMembers: ['user-12', 'user-13'],
        contactEmail: 'info@rosengarden.se',
        contactPhone: '+46 42 678 901'
      },
      {
        id: 'assoc-7',
        name: 'Bergshöjden BRF',
        address: 'Bergsvägen 34',
        city: 'Örebro',
        postalCode: '702 25',
        organizationNumber: '556789-0123',
        totalApartments: 38,
        totalMembers: 89,
        description: 'Högt belägen förening med fantastisk utsikt över staden.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        boardMembers: ['user-14'],
        contactEmail: 'info@bergshojden.se',
        contactPhone: '+46 19 789 012',
        website: 'www.bergshojden.se'
      },
      {
        id: 'assoc-8',
        name: 'Skogslunden BRF',
        address: 'Skogsvägen 67',
        city: 'Linköping',
        postalCode: '582 20',
        organizationNumber: '556890-1234',
        totalApartments: 31,
        totalMembers: 72,
        description: 'Naturnära boende med skog och promenadstråk runt knuten.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        boardMembers: ['user-15', 'user-16'],
        contactEmail: 'info@skogslunden.se',
        contactPhone: '+46 13 890 123'
      },
      {
        id: 'assoc-9',
        name: 'Strandvillan BRF',
        address: 'Strandpromenaden 12',
        city: 'Västerås',
        postalCode: '722 15',
        organizationNumber: '556901-2345',
        totalApartments: 26,
        totalMembers: 61,
        description: 'Exklusivt boende vid vattnet med egen brygga och båtplatser.',
        image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
        boardMembers: ['user-17'],
        contactEmail: 'info@strandvillan.se',
        contactPhone: '+46 21 901 234',
        website: 'www.strandvillan.se'
      },
      {
        id: 'assoc-10',
        name: 'Torget BRF',
        address: 'Torggatan 5',
        city: 'Norrköping',
        postalCode: '602 23',
        organizationNumber: '556012-3456',
        totalApartments: 44,
        totalMembers: 103,
        description: 'Centralt läge vid torget med affärer och restauranger i närheten.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        boardMembers: ['user-18', 'user-19'],
        contactEmail: 'info@torget.se',
        contactPhone: '+46 11 012 345'
      }
    ]
    currentAssociation.value = associations.value[0]
  }

  const getAssociationById = (id: string): Association | undefined => {
    return associations.value.find(a => a.id === id)
  }

  const searchAssociations = (query: string): Association[] => {
    const lowerQuery = query.toLowerCase()
    return associations.value.filter(a => 
      a.name.toLowerCase().includes(lowerQuery) ||
      a.city.toLowerCase().includes(lowerQuery) ||
      a.address.toLowerCase().includes(lowerQuery)
    )
  }

  return {
    associations,
    currentAssociation,
    initDemoData,
    getAssociationById,
    searchAssociations
  }
})
