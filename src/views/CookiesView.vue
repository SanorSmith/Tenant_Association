<template>
  <DefaultLayout>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-accent mb-2">Cookies</h1>
      <p class="text-textGray">Information om cookies på Grannskapet</p>
    </div>

    <div class="max-w-4xl">
      <BaseCard padding="md" class="mb-6">
        <div class="prose max-w-none">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 class="font-semibold text-blue-900 mb-2">🍪 Om cookies på Grannskapet</h3>
            <p class="text-blue-800">
              Grannskapet använder cookies för att förbättra din användarupplevelse, 
              säkerställa funktionalitet och för analysändamål. Denna sida förklarar vad 
              cookies är, hur vi använder dem och hur du kan hantera dem.
            </p>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">Vad är cookies?</h2>
          
          <p class="text-gray-700 mb-4">
            Cookies är små textfiler som lagras på din enhet (dator, mobil eller surfplatta) 
            när du besöker en webbplats. De hjälper webbplatsen att komma ihåg information om 
            dina besök och kan göra din upplevelse mer effektiv och personlig.
          </p>

          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 class="font-semibold text-gray-900 mb-2">Hur cookies fungerar</h3>
            <ol class="text-gray-700 space-y-2">
              <li>1. Du besöker Grannskapet</li>
              <li>2. Vi skickar en cookie till din webbläsare</li>
              <li>3. Cookien lagras på din enhet</li>
              <li>4. Nästa gång du besöker oss läser webbläsaren cookien</li>
              <li>5. Vi kan anpassa din upplevelse baserat på informationen</li>
            </ol>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">Typer av cookies vi använder</h2>
          
          <div class="space-y-6 mb-8">
            <div class="border rounded-lg p-4">
              <div class="flex items-start gap-3 mb-3">
                <span class="text-2xl">🔒</span>
                <div>
                  <h3 class="font-semibold text-navy mb-2">Nödvändiga cookies</h3>
                  <p class="text-sm text-gray-600">Essentiella för att webbplatsen ska fungera</p>
                </div>
              </div>
              <p class="text-gray-700 mb-3">
                Dessa cookies är nödvändiga för grundläggande funktioner som inloggning, 
                säkerhet och nätverkskommunikation. Utan dessa kan vissa delar av webbplatsen 
                inte fungera korrekt.
              </p>
              <div class="bg-gray-50 rounded p-3">
                <p class="text-sm text-gray-600"><strong>Exempel:</strong></p>
                <ul class="text-sm text-gray-600 mt-1">
                  <li>• Inloggningscookies</li>
                  <li>• Säkerhetscookies</li>
                  <li>• Session-cookies</li>
                </ul>
              </div>
            </div>

            <div class="border rounded-lg p-4">
              <div class="flex items-start gap-3 mb-3">
                <span class="text-2xl">⚙️</span>
                <div>
                  <h3 class="font-semibold text-navy mb-2">Funktionella cookies</h3>
                  <p class="text-sm text-gray-600">Förbättrar din användarupplevelse</p>
                </div>
              </div>
              <p class="text-gray-700 mb-3">
                Dessa cookies hjälper oss att komma ihåg dina preferenser och val, 
                som språkinställningar, tema och andra personaliseringsalternativ.
              </p>
              <div class="bg-gray-50 rounded p-3">
                <p class="text-sm text-gray-600"><strong>Exempel:</strong></p>
                <ul class="text-sm text-gray-600 mt-1">
                  <li>• Språkinställningar</li>
                  <li>• Temaval</li>
                  <li>• Användarpreferenser</li>
                </ul>
              </div>
            </div>

            <div class="border rounded-lg p-4">
              <div class="flex items-start gap-3 mb-3">
                <span class="text-2xl">📊</span>
                <div>
                  <h3 class="font-semibold text-navy mb-2">Analyscookies</h3>
                  <p class="text-sm text-gray-600">Hjälper oss att förbättra tjänsten</p>
                </div>
              </div>
              <p class="text-gray-700 mb-3">
                Dessa cookies samlar in information om hur du använder vår webbplats, 
                vilka sidor du besöker och hur lång tid du stannar. Informationen hjälper oss 
                att förbättra användarupplevelsen.
              </p>
              <div class="bg-gray-50 rounded p-3">
                <p class="text-sm text-gray-600"><strong>Exempel:</strong></p>
                <ul class="text-sm text-gray-600 mt-1">
                  <li>• Google Analytics</li>
                  <li>• Sidvisningsstatistik</li>
                  <li>• Användarbeteende</li>
                </ul>
              </div>
            </div>

            <div class="border rounded-lg p-4">
              <div class="flex items-start gap-3 mb-3">
                <span class="text-2xl">🎯</span>
                <div>
                  <h3 class="font-semibold text-navy mb-2">Marknadsföringscookies</h3>
                  <p class="text-sm text-gray-600">Används för riktad marknadsföring</p>
                </div>
              </div>
              <p class="text-gray-700 mb-3">
                Dessa cookies används för att visa relevanta annonser och för att 
                mäta effektiviteten av våra marknadsföringskampanjer.
              </p>
              <div class="bg-gray-50 rounded p-3">
                <p class="text-sm text-gray-600"><strong>Exempel:</strong></p>
                <ul class="text-sm text-gray-600 mt-1">
                  <li>• Facebook Pixel</li>
                  <li>• Google Ads</li>
                  <li>• LinkedIn Insight Tag</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">Specifika cookies vi använder</h2>
          
          <div class="overflow-x-auto mb-6">
            <table class="w-full border-collapse border border-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th class="border border-gray-300 px-4 py-2 text-left">Cookie-namn</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Typ</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Syfte</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Lagringstid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-300 px-4 py-2"><code>session_id</code></td>
                  <td class="border border-gray-300 px-4 py-2">Nödvändig</td>
                  <td class="border border-gray-300 px-4 py-2">Inloggningssession</td>
                  <td class="border border-gray-300 px-4 py-2">Tills sessionen avslutas</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="border border-gray-300 px-4 py-2"><code>preferences</code></td>
                  <td class="border border-gray-300 px-4 py-2">Funktionell</td>
                  <td class="border border-gray-300 px-4 py-2">Användarinställningar</td>
                  <td class="border border-gray-300 px-4 py-2">1 år</td>
                </tr>
                <tr>
                  <td class="border border-gray-300 px-4 py-2"><code>_ga</code></td>
                  <td class="border border-gray-300 px-4 py-2">Analys</td>
                  <td class="border border-gray-300 px-4 py-2">Google Analytics</td>
                  <td class="border border-gray-300 px-4 py-2">2 år</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="border border-gray-300 px-4 py-2"><code>_gid</code></td>
                  <td class="border border-gray-300 px-4 py-2">Analys</td>
                  <td class="border border-gray-300 px-4 py-2">Google Analytics</td>
                  <td class="border border-gray-300 px-4 py-2">24 timmar</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">Hantera cookies</h2>
          
          <div class="space-y-6 mb-8">
            <div class="border-l-4 border-blue-500 pl-4">
              <h3 class="font-semibold text-navy mb-2">🖥️ Via webbläsare</h3>
              <p class="text-gray-700 mb-3">
                Du kan hantera cookies genom dina webbläsarinställningar. De flesta webbläsare 
                låter dig:
              </p>
              <ul class="text-gray-700 space-y-1">
                <li>• Visa vilka cookies som lagrats</li>
                <li>• Radera befintliga cookies</li>
                <li>• Blockera tredjepartscookies</li>
                <li>• Meddela när cookies skickas</li>
              </ul>
            </div>

            <div class="border-l-4 border-green-500 pl-4">
              <h3 class="font-semibold text-navy mb-2">🔧 Vårt cookie-banner</h3>
              <p class="text-gray-700 mb-3">
                När du besöker Grannskapet för första gången ser du vårt cookie-banner där du kan:
              </p>
              <ul class="text-gray-700 space-y-1">
                <li>• Acceptera alla cookies</li>
                <li>• Välja vilka typer av cookies du godkänner</li>
                <li>• Läs mer om vår cookie-policy</li>
              </ul>
            </div>

            <div class="border-l-4 border-purple-500 pl-4">
              <h3 class="font-semibold text-navy mb-2">📱 Mobilappar</h3>
              <p class="text-gray-700">
                Om du använder vår mobilapp kan hanteringen ske via appens inställningar 
                eller enhetens systeminställningar.
              </p>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">Tredjepartscookies</h2>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 class="font-semibold text-yellow-900 mb-2">🔗 Externa tjänster</h3>
            <p class="text-yellow-800 mb-3">
              Vi använder vissa tredjepartstjänster som kan placera cookies på din enhet:
            </p>
            <div class="space-y-3">
              <div>
                <h4 class="font-semibold text-yellow-800">Google Analytics</h4>
                <p class="text-yellow-700 text-sm">För webbplatsanalys och användarstatistik</p>
              </div>
              <div>
                <h4 class="font-semibold text-yellow-800">Facebook/Meta</h4>
                <p class="text-yellow-700 text-sm">För sociala medier-funktioner och marknadsföring</p>
              </div>
              <div>
                <h4 class="font-semibold text-yellow-800">LinkedIn</h4>
                <p class="text-yellow-700 text-sm">För professionella nätverk och marknadsföring</p>
              </div>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">Cookies och integritet</h2>
          
          <div class="space-y-4 mb-6">
            <div class="border rounded-lg p-4">
              <h4 class="font-semibold text-navy mb-2">🔒 Dataskydd</h4>
              <p class="text-gray-700">
                Vi skyddar all data som samlas in via cookies enligt vår integritetspolicy. 
                Informationen är anonymiserad och kan inte spåras till enskilda användare.
              </p>
            </div>
            
            <div class="border rounded-lg p-4">
              <h4 class="font-semibold text-navy mb-2">🌐 Internationella överföringar</h4>
              <p class="text-gray-700">
                Vissa tredjepartstjänster kan lagra data utanför EU/EES. Vi ser till att alla 
                överföringar sker enligt GDPR och med adekvat skydd.
              </p>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-navy mb-4">Uppdateringar av cookie-policy</h2>
          
          <p class="text-gray-700 mb-6">
            Vi kan uppdatera denna cookie-policy från tid till annan för att reflektera 
            ändringar i vår användning av cookies eller av juridiska krav. Alla ändringar 
            publiceras på denna sida.
          </p>

          <h2 class="text-2xl font-bold text-navy mb-4">Kontaktinformation</h2>
          
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-2">📞 Frågor om cookies</h3>
            <p class="text-gray-700 mb-3">
              Om du har frågor om vår användning av cookies:
            </p>
            <div class="space-y-2 text-gray-700">
              <p><strong>E-post:</strong> privacy@grannskapet.se</p>
              <p><strong>Telefon:</strong> 08-123 456 78</p>
              <p><strong>Adress:</strong> Storgatan 1, 111 22 Stockholm</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm text-blue-800 text-center">
              <strong>Senast uppdaterad:</strong> {{ formatDate(lastUpdated) }}<br>
              Denna cookie-policy gäller för alla besökare på Grannskapet.
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
