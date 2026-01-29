<template>
  <DefaultLayout>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-accent mb-2">Integritetspolicy</h1>
      <p class="text-textGray">Hur vi hanterar och skyddar dina personuppgifter</p>
    </div>

    <div class="max-w-4xl">
      <BaseCard padding="md" class="mb-6">
        <div class="prose max-w-none">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 class="font-semibold text-blue-900 mb-2">🔒 Din integritet är viktig</h3>
            <p class="text-blue-800">
              Grannskapet tar din integritet på största allvar. Denna integritetspolicy beskriver hur vi 
              samlar in, använder och skyddar dina personuppgifter när du använder vår plattform.
            </p>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">1. Vilka uppgifter samlar vi in?</h2>
          
          <h3 class="text-xl font-semibold text-navy mb-3">Kontaktuppgifter</h3>
          <ul class="space-y-2 text-gray-700 mb-6">
            <li>• Namn och efternamn</li>
            <li>• E-postadress</li>
            <li>• Telefonnummer (frivilligt)</li>
            <li>• Adress (för ordförande/administratörer)</li>
          </ul>

          <h3 class="text-xl font-semibold text-navy mb-3">Användardata</h3>
          <ul class="space-y-2 text-gray-700 mb-6">
            <li>• Inloggningsuppgifter (krypterade)</li>
            <li>• Roll och behörigheter i föreningen</li>
            <li>• Aktivitetshistorik i systemet</li>
            <li>• Inställningar och preferenser</li>
          </ul>

          <h3 class="text-xl font-semibold text-navy mb-3">Föreningsdata</h3>
          <ul class="space-y-2 text-gray-700 mb-6">
            <li>• Föreningens namn och organisationsnummer</li>
            <li>• Adress och kontaktinformation</li>
            <li>• Antal medlemmar och lägenheter</li>
            <li>• Ekonomiska uppgifter (budget, avgifter etc.)</li>
          </ul>

          <h2 class="text-2xl font-bold text-navy mb-4">2. Hur använder vi dina uppgifter?</h2>
          
          <div class="space-y-4 mb-6">
            <div class="border-l-4 border-blue-500 pl-4">
              <h4 class="font-semibold text-navy mb-2">🏠 Föreningshantering</h4>
              <p class="text-gray-700">
                För att administrera din bostadsrättsförening, inklusive mötesinbjudningar, 
                dokumentdelning och aktivitetsplanering.
              </p>
            </div>
            
            <div class="border-l-4 border-green-500 pl-4">
              <h4 class="font-semibold text-navy mb-2">📞 Kommunikation</h4>
              <p class="text-gray-700">
                För att skicka viktig information, inbjudningar och påminnelser via e-post 
                och SMS (om du angett telefonnummer).
              </p>
            </div>
            
            <div class="border-l-4 border-purple-500 pl-4">
              <h4 class="font-semibold text-navy mb-2">🔐 Säkerhet</h4>
              <p class="text-gray-700">
                För att säkerställa att endast behöriga personer har tillgång till föreningens 
                information och för att skydda mot obehörig åtkomst.
              </p>
            </div>
            
            <div class="border-l-4 border-orange-500 pl-4">
              <h4 class="font-semibold text-navy mb-2">📊 Förbättring</h4>
              <p class="text-gray-700">
                För att analysera användning och förbättra våra tjänster, samt för att 
                ge support och felsökning.
              </p>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">3. Lagring och säkerhet</h2>
          
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 class="font-semibold text-green-900 mb-2">🛡️ Säkerhetsåtgärder</h3>
            <ul class="text-green-800 space-y-2">
              <li>• All data krypteras med SSL/TLS vid överföring</li>
              <li>• Lösenord hashas och saltas enligt industristandard</li>
              <li>• Regelbundna säkerhetskopior och disaster recovery</li>
              <li>• Servrar inom EU (GDPR-kompatibelt)</li>
              <li>• Begränsad åtkomst för personal</li>
              <li>• Regelbundna säkerhetsrevisioner</li>
            </ul>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">4. Delning av uppgifter</h2>
          
          <div class="space-y-4 mb-6">
            <div class="border rounded-lg p-4">
              <h4 class="font-semibold text-navy mb-2">👥 Inom föreningen</h4>
              <p class="text-gray-700">
                Din information delas med andra medlemmar i din förening baserat på din roll. 
                Ordförande har full tillgång, medan vanliga medlemmar endast ser publika 
                dokument och aktiviteter.
              </p>
            </div>
            
            <div class="border rounded-lg p-4">
              <h4 class="font-semibold text-navy mb-2">🏢 Tredje parter</h4>
              <p class="text-gray-700">
                Vi delar aldrig dina personuppgifter med tredje part utan ditt samtycke, 
                förutom när det krävs enligt lag (t.ex. myndighetsbegäran).
              </p>
            </div>
            
            <div class="border rounded-lg p-4">
              <h4 class="font-semibold text-navy mb-2">📧 Tjänsteleverantörer</h4>
              <p class="text-gray-700">
                Vi använder betrodda tjänsteleverantörer för e-post, lagring och support. 
                Alla leverantörer är GDPR-kompatibla och har strikta dataskyddsavtal.
              </p>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">5. Dina rättigheter</h2>
          
          <div class="space-y-4 mb-6">
            <div class="border-l-4 border-blue-500 pl-4">
              <h4 class="font-semibold text-navy mb-2">👁️ Rätt att se</h4>
              <p class="text-gray-700">
                Du har rätt att begära en kopia av alla personuppgifter vi har om dig.
              </p>
            </div>
            
            <div class="border-l-4 border-green-500 pl-4">
              <h4 class="font-semibold text-navy mb-2">✏️ Rätt att korrigera</h4>
              <p class="text-gray-700">
                Du kan begära att vi korrigerar felaktiga eller ofullständiga uppgifter.
              </p>
            </div>
            
            <div class="border-l-4 border-purple-500 pl-4">
              <h4 class="font-semibold text-navy mb-2">🗑️ Rätt att radera</h4>
              <p class="text-gray-700">
                Du kan begära att vi raderar dina personuppgifter (med vissa undantag enligt lag).
              </p>
            </div>
            
            <div class="border-l-4 border-orange-500 pl-4">
              <h4 class="font-semibold text-navy mb-2">📤 Rätt att flytta</h4>
              <p class="text-gray-700">
                Du har rätt att få dina uppgifter i ett maskinläsbart format för att flytta dem.
              </p>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">6. Cookies</h2>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 class="font-semibold text-yellow-900 mb-2">🍪 Cookies på Grannskapet</h3>
            <p class="text-yellow-800 mb-3">
              Vi använder cookies för att förbättra din upplevelse:
            </p>
            <ul class="text-yellow-800 space-y-1">
              <li>• <strong>Nödvändiga cookies:</strong> För att webbplatsen ska fungera</li>
              <li>• <strong>Funktionella cookies:</strong> För att komma ihåg dina inställningar</li>
              <li>• <strong>Analyscookies:</strong> För att förbättra våra tjänster</li>
            </ul>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">7. Barnskydd</h2>
          
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 class="font-semibold text-red-900 mb-2">👶 Skydd av minderåriga</h3>
            <p class="text-red-800">
              Grannskapet är inte avsett för personer under 18 år. Vi samlar inte medvetet 
              in personuppgifter från barn. Om vi upptäcker att vi har samlat in uppgifter 
              från ett barn raderar vi dem omedelbart.
            </p>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">8. Ändringar i policyn</h2>
          
          <p class="text-gray-700 mb-6">
            Vi kan uppdatera denna integritetspolicy från tid till annan. Alla ändringar 
            publiceras på denna sida och träder i kraft omedelbart. Vi kommer att meddela 
            betydande ändringar via e-post eller i systemet.
          </p>

          <h2 class="text-2xl font-bold text-navy mb-4">9. Kontaktinformation</h2>
          
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-2">📞 Kontakta oss</h3>
            <p class="text-gray-700 mb-3">
              Om du har frågor om denna integritetspolicy eller vill utöva dina rättigheter:
            </p>
            <div class="space-y-2 text-gray-700">
              <p><strong>E-post:</strong> gdpr@grannskapet.se</p>
              <p><strong>Telefon:</strong> 08-123 456 78</p>
              <p><strong>Adress:</strong> Storgatan 1, 111 22 Stockholm</p>
            </div>
            <p class="text-sm text-gray-600 mt-3">
              Vi svarar på alla förfrågningar inom 30 dagar enligt GDPR.
            </p>
          </div>

          <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm text-blue-800 text-center">
              <strong>Senast uppdaterad:</strong> {{ formatDate(lastUpdated) }}<br>
              Denna integritetspolicy gäller för alla användare av Grannskapet.
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'

const lastUpdated = computed(() => {
  return new Date('2024-01-20').toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('sv-SE')
}
</script>
