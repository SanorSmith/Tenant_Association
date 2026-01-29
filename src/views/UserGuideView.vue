<template>
  <PublicLayout>
    <div class="container-custom">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-accent mb-4">Användarguide</h1>
        <p class="text-xl text-textGray max-w-2xl mx-auto">Komplett guide för att använda Grannskapet effektivt</p>
      </div>

    <!-- Guide Navigation -->
    <BaseCard padding="md" class="mb-6">
      <div class="flex flex-wrap gap-2">
        <BaseButton 
          :variant="activeSection === 'overview' ? 'primary' : 'outline'"
          @click="activeSection = 'overview'"
          size="sm"
        >
          Översikt
        </BaseButton>
        <BaseButton 
          :variant="activeSection === 'getting-started' ? 'primary' : 'outline'"
          @click="activeSection = 'getting-started'"
          size="sm"
        >
          Komma igång
        </BaseButton>
        <BaseButton 
          :variant="activeSection === 'meetings' ? 'primary' : 'outline'"
          @click="activeSection = 'meetings'"
          size="sm"
        >
          Möten
        </BaseButton>
        <BaseButton 
          :variant="activeSection === 'documents' ? 'primary' : 'outline'"
          @click="activeSection = 'documents'"
          size="sm"
        >
          Dokument
        </BaseButton>
        <BaseButton 
          :variant="activeSection === 'activities' ? 'primary' : 'outline'"
          @click="activeSection = 'activities'"
          size="sm"
        >
          Aktiviteter
        </BaseButton>
        <BaseButton 
          :variant="activeSection === 'premises' ? 'primary' : 'outline'"
          @click="activeSection = 'premises'"
          size="sm"
        >
          Lokaler
        </BaseButton>
        <BaseButton 
          :variant="activeSection === 'budget' ? 'primary' : 'outline'"
          @click="activeSection = 'budget'"
          size="sm"
        >
          Budget
        </BaseButton>
      </div>
    </BaseCard>

    <!-- Guide Content -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <BaseCard padding="md">
          <!-- Overview Section -->
          <div v-if="activeSection === 'overview'" class="prose max-w-none">
            <h2 class="text-2xl font-bold text-navy mb-4">Välkommen till Grannskapet!</h2>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-blue-900 mb-2"><span class="emoji-uncolored">🎯</span> Vad är Grannskapet?</h3>
              <p class="text-blue-800">
                Grannskapet är en komplett plattform för bostadsrättsföreningar som förenklar administration, 
                förbättrar kommunikation och stärker grannsamverkan. Allt ni behöver för att driva er förening 
                effektivt på ett ställe.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-navy mb-3"><span class="emoji-uncolored">🌟</span> Huvudfunktioner</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2"><span class="emoji-uncolored">📅</span> Möteshantering</h4>
                <p class="text-sm text-gray-600">Planera, bjuda in och dokumentera möten automatiskt</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2"><span class="emoji-uncolored">📄</span> Dokumenthantering</h4>
                <p class="text-sm text-gray-600">Skapa, dela och versionshantera alla föreningens dokument</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2"><span class="emoji-uncolored">🎉</span> Aktiviteter</h4>
                <p class="text-sm text-gray-600">Organisera och administrera föreningens aktiviteter</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2"><span class="emoji-uncolored">💰</span> Budget</h4>
                <p class="text-sm text-gray-600">Översikt och hantering av föreningens ekonomi</p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-navy mb-3"><span class="emoji-uncolored">👥</span> Roller och behörigheter</h3>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <span class="text-2xl emoji-uncolored">👑</span>
                <div>
                  <h4 class="font-semibold text-navy">Ordförande</h4>
                  <p class="text-sm text-gray-600">Full administratörsåtkomst, kan hantera allt i föreningen</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-2xl emoji-uncolored">📋</span>
                <div>
                  <h4 class="font-semibold text-navy">Styrelsemedlem</h4>
                  <p class="text-sm text-gray-600">Tillgång till möten, dokument och aktiviteter</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-2xl emoji-uncolored">👤</span>
                <div>
                  <h4 class="font-semibold text-navy">Medlem</h4>
                  <p class="text-sm text-gray-600">Kan se publika dokument och delta i aktiviteter</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Getting Started Section -->
          <div v-if="activeSection === 'getting-started'" class="prose max-w-none">
            <h2 class="text-2xl font-bold text-navy mb-4">Komma igång</h2>
            
            <div class="space-y-6">
              <div class="border-l-4 border-blue-500 pl-4">
                <h3 class="font-semibold text-navy mb-2">Steg 1: Skapa konto</h3>
                <p class="text-sm text-gray-600 mb-2">Börja med att skapa ditt konto som ordförande för föreningen.</p>
                <ol class="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>Gå till registreringssidan</li>
                  <li>Fyll i din e-postadress och skapa lösenord</li>
                  <li>Verifiera din e-post</li>
                  <li>Fyll i din profilinformation</li>
                </ol>
              </div>

              <div class="border-l-4 border-green-500 pl-4">
                <h3 class="font-semibold text-navy mb-2">Steg 2: Registrera föreningen</h3>
                <p class="text-sm text-gray-600 mb-2">Lägg till din bostadsrättsförening i systemet.</p>
                <ol class="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>Ange föreningens namn och organisationsnummer</li>
                  <li>Fyll i adress och kontaktinformation</li>
                  <li>Ladda upp föreningsstadgar (valfritt)</li>
                  <li>Bekräfta registreringen</li>
                </ol>
              </div>

              <div class="border-l-4 border-purple-500 pl-4">
                <h3 class="font-semibold text-navy mb-2">Steg 3: Bjud in styrelsen</h3>
                <p class="text-sm text-gray-600 mb-2">Lägg till övriga styrelsemedlemmar i systemet.</p>
                <ol class="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>Gå till "Användare" i menyn</li>
                  <li>Klicka på "Bjud in användare"</li>
                  <li>Ange e-postadress och välj roll</li>
                  <li>Skicka inbjudan</li>
                </ol>
              </div>

              <div class="border-l-4 border-orange-500 pl-4">
                <h3 class="font-semibold text-navy mb-2">Steg 4: Konfigurera grundinställningar</h3>
                <p class="text-sm text-gray-600 mb-2">Anpassa systemet efter er förenings behov.</p>
                <ol class="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>Registrera föreningens lokaler</li>
                  <li>Skapa dokumentmallar</li>
                  <li>Ställ in påminnelser för möten</li>
                  <li>Anpassa roller och behörigheter</li>
                </ol>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <h3 class="font-semibold text-green-900 mb-2">✅ Klart att börja!</h3>
              <p class="text-green-800">
                Nu är er förening redo att använda Grannskapet fullt ut. Börja med att skapa ert första möte 
                eller ladda upp befintliga dokument.
              </p>
            </div>
          </div>

          <!-- Meetings Section -->
          <div v-if="activeSection === 'meetings'" class="prose max-w-none">
            <h2 class="text-2xl font-bold text-navy mb-4">Möteshantering</h2>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-blue-900 mb-2">📅 Möten i Grannskapet</h3>
              <p class="text-blue-800">
                Håll koll på alla föreningsmöten, från planering till protokoll. Automatiska inbjudningar 
                och påminnelser ser till att ingen missar viktiga möten.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-navy mb-3">Skapa ett möte</h3>
            <ol class="space-y-4">
              <li class="flex items-start gap-3">
                <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <h4 class="font-semibold text-navy">Grundinformation</h4>
                  <p class="text-sm text-gray-600">Fyll i mötestitel, datum, tid och plats. Välj mötestyp (styrelsemöte, föreningsstämma etc.)</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <h4 class="font-semibold text-navy">Deltagare</h4>
                  <p class="text-sm text-gray-600">Välj vilka styrelsemedlemmar som ska bjudas in. Systemat skickar automatiska inbjudningar.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <h4 class="font-semibold text-navy">Agenda</h4>
                  <p class="text-sm text-gray-600">Skapa agenda med våra mallar eller från grunden. Lägg till beslutsförslag och diskussionspunkter.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">4</span>
                <div>
                  <h4 class="font-semibold text-navy">Publicera</h4>
                  <p class="text-sm text-gray-600">Spara mötet. Inbjudningar skickas omedelbart och påminnelser dag innan.</p>
                </div>
              </li>
            </ol>

            <h3 class="text-xl font-semibold text-navy mb-3 mt-6">Under mötet</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">📝 Protokollföring</h4>
                <p class="text-sm text-gray-600">Använd vår protokollmall för att föra protokoll direkt i systemet. Markera närvarande och dokumentera beslut.</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">📸 Dokument</h4>
                <p class="text-sm text-gray-600">Ladda upp bilder, presentationer och andra dokument som delas med deltagarna.</p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-navy mb-3 mt-6">Efter mötet</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>✅ Granska och godkänn protokoll</li>
              <li>✅ Distribuera till alla medlemmar</li>
              <li>✅ Arkivera beslutsunderlag</li>
              <li>✅ Uppföljning av åtgärder</li>
            </ul>
          </div>

          <!-- Documents Section -->
          <div v-if="activeSection === 'documents'" class="prose max-w-none">
            <h2 class="text-2xl font-bold text-navy mb-4">Dokumenthantering</h2>
            
            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-purple-900 mb-2">📄 Allt på ett ställe</h3>
              <p class="text-purple-800">
                Hantera alla föreningens dokument i ett säkert och organiserat system. 
                Från stadgar till protokoll - allt finns lättillgängligt.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-navy mb-3">Dokumenttyper</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">📋 Agenda</h4>
                <p class="text-sm text-gray-600">Strukturerade mallar för mötesagendor med automatisk numrering och formatering</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">📝 Protokoll</h4>
                <p class="text-sm text-gray-600">Professionella protokollmallar med plats för beslut och närvarolistor</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">📊 Rapporter</h4>
                <p class="text-sm text-gray-600">Årsredovisningar, budgetar och andra ekonomiska dokument</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">📚 Policyer</h4>
                <p class="text-sm text-gray-600">Stadgar, ordningsregler och andra policydokument</p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-navy mb-3">Skapa dokument</h3>
            <ol class="space-y-3">
              <li class="flex items-start gap-3">
                <span class="text-green-500">✅</span>
                <div>
                  <h4 class="font-semibold text-navy">Välj mall</h4>
                  <p class="text-sm text-gray-600">Välj bland färdiga mallar eller skapa egen</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-green-500">✅</span>
                <div>
                  <h4 class="font-semibold text-navy">Fyll i innehåll</h4>
                  <p class="text-sm text-gray-600">Använd guidad arbetsflöde för att fylla i varje avsnitt</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-green-500">✅</span>
                <div>
                  <h4 class="font-semibold text-navy">Granska och publicera</h4>
                  <p class="text-sm text-gray-600">Granska dokumentet och gör det tillgängligt för rätt personer</p>
                </div>
              </li>
            </ol>
          </div>

          <!-- Activities Section -->
          <div v-if="activeSection === 'activities'" class="prose max-w-none">
            <h2 class="text-2xl font-bold text-navy mb-4">Aktiviteter</h2>
            
            <div class="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-pink-900 mb-2">🎉 Stärk gemenskapen</h3>
              <p class="text-pink-800">
                Organisera och administrera föreningens aktiviteter enkelt. Från städdagar 
                till festliga tillställningar - allt på ett ställe.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-navy mb-3">Aktivitetstyper</h3>
            <div class="space-y-4">
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">🧹 Underhåll</h4>
                <p class="text-sm text-gray-600">Städdagar, trädgårdsarbete och andra underhållsaktiviteter</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">🎉 Sociala aktiviteter</h4>
                <p class="text-sm text-gray-600">Fester, grillkvällar och andra sociala samlingar</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">📚 Utbildning</h4>
                <p class="text-sm text-gray-600">Informationsmöten och utbildningstillfällen</p>
              </div>
            </div>
          </div>

          <!-- Premises Section -->
          <div v-if="activeSection === 'premises'" class="prose max-w-none">
            <h2 class="text-2xl font-bold text-navy mb-4">Lokalbokning</h2>
            
            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-orange-900 mb-2">🏢 Enkel lokalhantering</h3>
              <p class="text-orange-800">
                Registrera och hantera föreningens lokaler. Medlemmar kan se tillgänglighet 
                och skicka bokningsförfrågningar direkt.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-navy mb-3">Registrera lokaler</h3>
            <ol class="space-y-2 text-sm text-gray-600">
              <li>1. Lägg till lokalens namn och beskrivning</li>
              <li>2. Ange kapacitet och utrustning</li>
              <li>3. Sätt regler och bokningsvillkor</li>
              <li>4. Definiera tillgängliga tider</li>
            </ol>
          </div>

          <!-- Budget Section -->
          <div v-if="activeSection === 'budget'" class="prose max-w-none">
            <h2 class="text-2xl font-bold text-navy mb-4">Budget och ekonomi</h2>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-green-900 mb-2">💰 Ekonomisk översikt</h3>
              <p class="text-green-800">
                Håll koll på föreningens ekonomi med visualiseringar och rapporter. 
                Koppla budgetposter till aktiviteter för full spårbarhet.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-navy mb-3">Budgetfunktioner</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">📊 Visualiseringar</h4>
                <p class="text-sm text-gray-600">Stapeldiagram och cirkeldiagram för budgetöversikt</p>
              </div>
              <div class="border rounded-lg p-4">
                <h4 class="font-semibold text-navy mb-2">📝 Budgetposter</h4>
                <p class="text-sm text-gray-600">Skapa, redigera och hantera budgetposter</p>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Quick Links -->
        <BaseCard padding="md" class="mb-6">
          <h3 class="text-lg font-semibold text-navy mb-4">Snabblänkar</h3>
          <div class="space-y-2">
            <RouterLink to="/hjalpcenter" class="block p-2 hover:bg-gray-50 rounded text-sm text-navy">
              📚 Hjälpcenter
            </RouterLink>
            <RouterLink to="/faq" class="block p-2 hover:bg-gray-50 rounded text-sm text-navy">
              ❓ Vanliga frågor
            </RouterLink>
            <RouterLink to="/kontakt" class="block p-2 hover:bg-gray-50 rounded text-sm text-navy">
              📞 Kontakta oss
            </RouterLink>
          </div>
        </BaseCard>

        <!-- Progress Tracker -->
        <BaseCard padding="md" class="mb-6">
          <h3 class="text-lg font-semibold text-navy mb-4">Din framsteg</h3>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Profil komplett</span>
                <span>100%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Styrelsen inbjuden</span>
                <span>75%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 75%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Första mötet skapat</span>
                <span>50%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-orange-500 h-2 rounded-full" style="width: 50%"></div>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Tips -->
        <BaseCard padding="md">
          <h3 class="text-lg font-semibold text-navy mb-4">💡 Tips</h3>
          <div class="space-y-3 text-sm">
            <div class="p-3 bg-blue-50 rounded-lg">
              <p class="text-blue-800">
                <strong>Pro-tip:</strong> Använd dokumentmallar för att spara tid och säkerställa enhetligt format.
              </p>
            </div>
            <div class="p-3 bg-green-50 rounded-lg">
              <p class="text-green-800">
                <strong>Goda råd:</strong> Sätt upp regelbundna styrelsemöten för att hålla momentum i föreningen.
              </p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
    </div>
  </PublicLayout>
</template>

<style scoped>
.emoji-uncolored {
  filter: hue-rotate(200deg) saturate(1.5) brightness(1.1);
}

.emoji-blue {
  filter: hue-rotate(200deg) saturate(2);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'

const activeSection = ref('overview')
</script>
