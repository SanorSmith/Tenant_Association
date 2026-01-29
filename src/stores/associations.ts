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
        description: 'Välskött bostadsrättsförening i Vasastan med anor från 1948. Föreningen genomgick totalrenovering 2016 med nya fönster, isolering och moderniserade VVS-system. Beläget i lugna innergård med närhet till Odenplan, Stadsbiblioteket och Vasaparken. Gemensamhetslokaler med sällskapsrum, gym och cykelförråd. Föreningen har ett aktivt föreningsliv med sommarfest, luciafirande och gemensamma trädgårdsdagar.',
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
        description: 'Välmående bostadsrättsförening i hjärtat av Majorna med anor från 1982. Föreningen har genomgått totalrenovering 2018 med moderna energisystem och gröna tak. Nära till Slottskogen, Liseberg och Göteborgs universitet. Gemensamhetslokaler med gym, bastu och sällskapsrum.',
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
        description: 'Lyxig bostadsrättsförening i Västra Hamnen med panoramautsikt över Öresundsbron. Byggd 2005 med arkitektonisk design och högsta standard. Alla lägenheter har balkong eller terrass. Föreningen har egen strandpromenad, gemensam takterrass med spa och garage med elbilsladdning.',
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
        description: 'Historisk förening från 1926 i Uppsalas absoluta centrum. Huset är kulturmärkt och har bevarat sin ursprungliga charm med höga tak, stora fönster och kakelugnar. Nära till Uppsala universitet, universitetssjukhuset och alla kommunikationer. Föreningen har en vacker innergård med äppelträd.',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        boardMembers: ['user-9'],
        contactEmail: 'info@centrumhuset.se',
        contactPhone: '+46 18 456 789',
        website: 'www.centrumhuset.se'
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
        description: 'Familjevänlig förening i det populära området Norra Fäladen. Byggd 1974 men kontinuerligt underhållen med ny fasad 2019. Stora grönområden, lekplatser och närhet till flera skolor. Föreningen har ett aktivt föreningsliv med midsommarfirande, höstfester och gemensamma trädgårdsdagar.',
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
        description: 'Charmig förening i det eftertraktade området Närlunda med vackra trädgårdar och mysig atmosfär. Byggd 1960 i klassisk miljonprogramsstil men med genomgripande renovering 2016. Nära till Sofiero slott, Pålsjö skog och Helsingborgs C. Föreningen har gemensam tvättstuga, cykelförråd och vinterträdgård.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        boardMembers: ['user-12', 'user-13'],
        contactEmail: 'info@rosengarden.se',
        contactPhone: '+46 42 678 901',
        website: 'www.rosengarden.se'
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
        description: 'Högt belägen förening med fantastisk utsikt över Örebro och Wadköping. Byggd 1998 med moderna material och energisnåla lösningar. Nära till naturen med promenadstråk i Olaus Petri-parken och Örebro universitet. Föreningen har gemensam bastu, övernattningsrum för gäster och bilpool.',
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
        description: 'Naturnära boende med direkt anslutning till Tinnerbäcken och Ekholmen. Byggd 2002 med fokus på hållbarhet och miljö. Alla lägenheter har stora balkonger mot skogen. Föreningen har gemensam vedeldad bastu, grillplats och förråd. Nära till Linköpings universitet och Saab.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        boardMembers: ['user-15', 'user-16'],
        contactEmail: 'info@skogslunden.se',
        contactPhone: '+46 13 890 123',
        website: 'www.skogslunden.se'
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
        description: 'Exklusivt boende vid Mälaren med egen brygga och 15 båtplatser. Byggd 1990 med högsta standard och sjöläge. Föreningen har en vacker anlagd trädgård med rosor och fruktträd. Nära till Västerås centrum, badplats och golfbana. Endast 5 minuter till E18.',
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
        description: 'Centralt läge vid Drottninggatan med närhet till Industrilandskapet och Motala ström. Byggd 1975 men totalrenoverad 2018 med nya fönster, isolering och hiss. Föreningen har gemensam takterrass med utsikt över staden, cykelrum och övernattningslägenhet. Nära till Norrköpings universitet och sjukhus.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        boardMembers: ['user-18', 'user-19'],
        contactEmail: 'info@torget.se',
        contactPhone: '+46 11 012 345',
        website: 'www.torget.se'
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
