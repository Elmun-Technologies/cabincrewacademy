import type { Phase } from '@/types'

export const phase7: Phase = {
  id: 'phase-7', order: 7, titleKey: 'phases.7.title', descriptionKey: 'phases.7.desc',
  mechanic: 'ipa', estimatedDays: 56, unlockThreshold: 80,
  lessons: [
    {
      id: 'ipa-lesson-1', titleKey: 'english.ipa', type: 'ipa', xpReward: 50, durationMinutes: 20,
      content: { blocks: [
        { type: 'heading', text: { uz: 'IPA — Xalqaro fonetik alifbo', en: 'IPA — International Phonetic Alphabet' } },
        { type: 'paragraph', text: { uz: 'IPA ingliz tilidagi tovushlarni aniq o\'rganish uchun ishlatiladi.', en: 'IPA is used to learn English sounds precisely.' } },
        { type: 'ipa', sounds: [
          { symbol: '/iː/', example: 'ee', word: 'seat', description: { uz: 'Uzun "i" tovushi', en: 'Long "ee" sound' } },
          { symbol: '/ɪ/', example: 'i', word: 'sit', description: { uz: 'Qisqa "i" tovushi', en: 'Short "i" sound' } },
          { symbol: '/e/', example: 'e', word: 'bed', description: { uz: '"e" tovushi', en: '"e" sound as in bed' } },
          { symbol: '/æ/', example: 'a', word: 'cat', description: { uz: 'Ochiq "a" tovushi', en: 'Open "a" sound' } },
          { symbol: '/ɑː/', example: 'ah', word: 'car', description: { uz: 'Uzun "a" tovushi', en: 'Long "ah" sound' } },
        ]},
      ]},
    },
    {
      id: 'ipa-lesson-2', titleKey: 'english.ipa', type: 'ipa', xpReward: 50, durationMinutes: 20,
      content: { blocks: [
        { type: 'heading', text: { uz: 'IPA — Undosh tovushlar', en: 'IPA — Consonant Sounds' } },
        { type: 'ipa', sounds: [
          { symbol: '/θ/', example: 'th', word: 'think', description: { uz: 'Til tish orasida', en: 'Tongue between teeth' } },
          { symbol: '/ð/', example: 'th', word: 'this', description: { uz: 'Tovushli "th"', en: 'Voiced "th"' } },
          { symbol: '/ʃ/', example: 'sh', word: 'ship', description: { uz: '"sh" tovushi', en: '"sh" sound' } },
          { symbol: '/tʃ/', example: 'ch', word: 'chair', description: { uz: '"ch" tovushi', en: '"ch" sound' } },
          { symbol: '/ŋ/', example: 'ng', word: 'sing', description: { uz: '"ng" tovushi', en: '"ng" sound' } },
        ]},
      ]},
    },
    {
      id: 'aviation-vocab-1', titleKey: 'english.aviation', type: 'flashcard', xpReward: 60, durationMinutes: 25,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Aviation English — Asosiy terminlar', en: 'Aviation English — Basic Terms' } },
        { type: 'flashcards', cards: [
          { id: 'f1', front: { uz: 'Boarding pass', en: 'Boarding pass' }, back: { uz: 'Bortga chiqish taloni', en: 'Document for boarding' }, category: 'aviation' },
          { id: 'f2', front: { uz: 'Cabin crew', en: 'Cabin crew' }, back: { uz: 'Kabina ekipaji', en: 'Flight attendants' }, category: 'aviation' },
          { id: 'f3', front: { uz: 'Fasten seatbelt', en: 'Fasten seatbelt' }, back: { uz: 'Xavfsizlik kamarni bog\'lang', en: 'Secure your seatbelt' }, category: 'aviation' },
          { id: 'f4', front: { uz: 'Life vest', en: 'Life vest' }, back: { uz: 'Qutqaruv jilet', en: 'Flotation device' }, category: 'safety' },
          { id: 'f5', front: { uz: 'Emergency exit', en: 'Emergency exit' }, back: { uz: 'Favqulodda chiqish', en: 'Exit for emergencies' }, category: 'safety' },
          { id: 'f6', front: { uz: 'Oxygen mask', en: 'Oxygen mask' }, back: { uz: 'Kislorod niqobi', en: 'Mask for oxygen supply' }, category: 'safety' },
          { id: 'f7', front: { uz: 'Turbulence', en: 'Turbulence' }, back: { uz: 'Turbulentlik', en: 'Air instability' }, category: 'aviation' },
          { id: 'f8', front: { uz: 'Landing', en: 'Landing' }, back: { uz: 'Qo\'nish', en: 'Aircraft touching ground' }, category: 'aviation' },
        ]},
      ]},
    },
    {
      id: 'aviation-vocab-2', titleKey: 'english.aviation', type: 'flashcard', xpReward: 60, durationMinutes: 25,
      content: { blocks: [
        { type: 'flashcards', cards: [
          { id: 'f9', front: { uz: 'Galley', en: 'Galley' }, back: { uz: 'Samolyot oshxonasi', en: 'Aircraft kitchen' }, category: 'aviation' },
          { id: 'f10', front: { uz: 'Aisle', en: 'Aisle' }, back: { uz: 'Yo\'lak', en: 'Walkway between seats' }, category: 'aviation' },
          { id: 'f11', front: { uz: 'Overhead bin', en: 'Overhead bin' }, back: { uz: 'Yuqori yuk bo\'limi', en: 'Storage above seats' }, category: 'aviation' },
          { id: 'f12', front: { uz: 'Armrest', en: 'Armrest' }, back: { uz: 'Qo\'l tayanchi', en: 'Arm support on seat' }, category: 'aviation' },
          { id: 'f13', front: { uz: 'Window shade', en: 'Window shade' }, back: { uz: 'Deraza pardasi', en: 'Window cover' }, category: 'aviation' },
          { id: 'f14', front: { uz: 'Duty free', en: 'Duty free' }, back: { uz: 'Bojxona to\'lovisiz', en: 'Tax-free shopping' }, category: 'service' },
        ]},
      ]},
    },
    {
      id: 'interview-english', titleKey: 'english.interview', type: 'text', xpReward: 50, durationMinutes: 30,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Intervyu inglizchasi — STAR usuli', en: 'Interview English — STAR Method' } },
        { type: 'paragraph', text: { uz: 'STAR: Situation, Task, Action, Result — intervyu savollariga javob berish usuli.', en: 'STAR: Situation, Task, Action, Result — method for answering interview questions.' } },
        { type: 'list', items: [
          { uz: '"Tell me about yourself" — o\'zingiz haqingizda', en: '"Tell me about yourself"' },
          { uz: '"Why Etihad?" — nima uchun Etihad?', en: '"Why do you want to join Etihad?"' },
          { uz: '"Describe a difficult situation" — qiyin vaziyat', en: '"Describe a difficult situation"' },
          { uz: '"How do you handle stress?" — stress bilan kurash', en: '"How do you handle stress?"' },
          { uz: '"Tell me about teamwork" — jamoa ishi', en: '"Tell me about teamwork"' },
        ]},
        { type: 'quiz', quiz: { id: 'star-q', passingScore: 70, questions: [
          { id: 'star1', question: { uz: 'STAR da "A" nimani anglatadi?', en: 'In STAR, what does "A" stand for?' },
            options: [{ uz: 'Answer', en: 'Answer' }, { uz: 'Action', en: 'Action' }, { uz: 'Airline', en: 'Airline' }, { uz: 'Ability', en: 'Ability' }], correctIndex: 1 },
          { id: 'star2', question: { uz: 'STAR da "S" nimani anglatadi?', en: 'In STAR, what does "S" stand for?' },
            options: [{ uz: 'Skill', en: 'Skill' }, { uz: 'Situation', en: 'Situation' }, { uz: 'Story', en: 'Story' }, { uz: 'Strength', en: 'Strength' }], correctIndex: 1 },
          { id: 'star3', question: { uz: 'Intervyu davomida eng muhim narsa?', en: 'Most important during interview?' },
            options: [{ uz: 'Tez gapirish', en: 'Speaking fast' }, { uz: 'Aniq misol bilan javob', en: 'Concrete examples' }, { uz: 'Faqat tabassum', en: 'Just smile' }, { uz: 'Uzun javob', en: 'Long answers' }], correctIndex: 1 },
        ]}},
      ]},
    },
  ],
}

export const phase8: Phase = {
  id: 'phase-8', order: 8, titleKey: 'phases.8.title', descriptionKey: 'phases.8.desc',
  mechanic: 'video', estimatedDays: 10, unlockThreshold: 80,
  lessons: [
    {
      id: 'interview-prep', titleKey: 'phases.8.title', type: 'text', xpReward: 50, durationMinutes: 30,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Intervyu tayyorgarligi — to\'liq qo\'llanma', en: 'Interview Preparation — Complete Guide' } },
        { type: 'paragraph', text: {
          uz: 'Etihad intervyu jarayoni 4 bosqichdan iborat: online ariza, video intervyu, assessment day, final intervyu. Har birida turli ko\'nikma talab qilinadi.',
          en: 'The Etihad interview process has 4 stages: online application, video interview, assessment day, final interview. Each demands different skills.'
        } },
        { type: 'list', items: [
          { uz: '🎥 Video intervyu — 1-2 daqiqalik javoblar, yaxshi yorug\'lik kerak', en: '🎥 Video interview — 1-2 min answers, good lighting required' },
          { uz: '👥 1-on-1 suhbat — motivatsiya, tajriba, Etihad bilimi', en: '👥 1-on-1 conversation — motivation, experience, Etihad knowledge' },
          { uz: '🤝 Guruh mashqi — teamwork, communication, leadership', en: '🤝 Group exercise — teamwork, communication, leadership' },
          { uz: '👔 Professional kiyinish — uniform standartda', en: '👔 Professional attire — uniform standard' },
          { uz: '👁️ Eye contact va doimiy tabassum (Etihad smile)', en: '👁️ Eye contact and constant smile (Etihad smile)' },
          { uz: '🗣️ Aniq, sekin, ovozli ingliz tilida gapirish', en: '🗣️ Speak clear, slow and audible English' },
        ]},
      ]},
    },
    {
      id: 'common-questions', titleKey: 'phases.8.title', type: 'text', xpReward: 75, durationMinutes: 30,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Eng ko\'p so\'raladigan savollar', en: 'Most Common Interview Questions' } },
        { type: 'list', items: [
          { uz: '1. "Tell me about yourself" — STAR formati, 90 soniya', en: '1. "Tell me about yourself" — STAR format, 90 seconds' },
          { uz: '2. "Why do you want to be cabin crew?" — passion + service', en: '2. "Why do you want to be cabin crew?" — passion + service' },
          { uz: '3. "Why Etihad Airways?" — kompaniya tarixi, qadriyatlar', en: '3. "Why Etihad Airways?" — history, values, hub' },
          { uz: '4. "Tell me about a difficult customer" — STAR misol', en: '4. "Tell me about a difficult customer" — STAR example' },
          { uz: '5. "How do you handle stress?" — konkret strategiya', en: '5. "How do you handle stress?" — concrete strategy' },
          { uz: '6. "Describe a teamwork situation" — sizning rolingiz', en: '6. "Describe a teamwork situation" — your role' },
          { uz: '7. "Your weakness?" — yaxshilash ustida ishlayotgan zaiflik', en: '7. "Your weakness?" — one you\'re actively improving' },
          { uz: '8. "Where do you see yourself in 5 years?" — Etihad ichida o\'sish', en: '8. "Where do you see yourself in 5 years?" — growth at Etihad' },
        ]},
        { type: 'paragraph', text: { uz: 'Har bir savol uchun STAR + Etihad qadriyatlariga bog\'lash. "Customer first" mantrasi.', en: 'For each: use STAR + tie to Etihad values. "Customer first" mantra.' } },
        { type: 'quiz', quiz: { id: 'int-q', passingScore: 70, questions: [
          { id: 'iq1', question: { uz: 'Video intervyuda eng muhim nima?', en: 'Most important in video interview?' },
            options: [{ uz: 'Fon', en: 'Background' }, { uz: 'Tabassum, aniq gapirish, ko\'z aloqa', en: 'Smile, clear speech, eye contact' }, { uz: 'Kiyim', en: 'Clothing only' }, { uz: 'Uzun javob', en: 'Long answers' }], correctIndex: 1 },
          { id: 'iq2', question: { uz: '"Tell me about yourself" javobi necha daqiqa?', en: '"Tell me about yourself" answer duration?' },
            options: [{ uz: '15 soniya', en: '15 seconds' }, { uz: '60-90 soniya', en: '60-90 seconds' }, { uz: '5 daqiqa', en: '5 minutes' }, { uz: '10 daqiqa', en: '10 minutes' }], correctIndex: 1 },
          { id: 'iq3', question: { uz: 'Etihad hub qaerda?', en: 'Where is Etihad hub?' },
            options: [{ uz: 'Dubai (DXB)', en: 'Dubai (DXB)' }, { uz: 'Abu Dhabi (AUH)', en: 'Abu Dhabi (AUH)' }, { uz: 'Doha (DOH)', en: 'Doha (DOH)' }, { uz: 'Riyadh (RUH)', en: 'Riyadh (RUH)' }], correctIndex: 1 },
          { id: 'iq4', question: { uz: '"Your weakness" savoliga eng yaxshi javob?', en: 'Best answer to "Your weakness"?' },
            options: [{ uz: 'Yo\'q', en: 'I have none' }, { uz: 'Yaxshilanish ustida ishlayotgan zaiflik', en: 'A weakness I\'m actively improving' }, { uz: 'Perfectionism', en: 'Perfectionism (cliché)' }, { uz: 'Tezda jahli chiqaman', en: 'Quick temper' }], correctIndex: 1 },
        ]}},
      ]},
    },
    {
      id: 'mock-scenarios', titleKey: 'phases.8.title', type: 'scenario', xpReward: 60, durationMinutes: 25,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Mock intervyu — vaziyat', en: 'Mock Interview — Scenario' } },
        { type: 'scenario', scenario: {
          id: 's-int',
          startNode: 'start',
          nodes: {
            start: {
              text: { uz: 'Intervyu boshlandi. Recruiter: "Tell me why you want to join Etihad."', en: 'Interview starts. Recruiter: "Tell me why you want to join Etihad."' },
              choices: [
                { id: 'c1', text: { uz: 'Etihad — UAE flagman aviakompaniyasi, Abu Dhabi hub, 100+ marshrut...', en: 'Etihad is the UAE flag carrier, Abu Dhabi hub, 100+ routes...' }, nextNode: 'good', xpDelta: 15, feedback: { uz: 'Aniq tarix va statistika', en: 'Concrete history and stats' } },
                { id: 'c2', text: { uz: 'Maoshi yaxshi', en: 'Good salary' }, nextNode: 'bad', xpDelta: 0, feedback: { uz: 'Hech qachon maosh haqida aytmang', en: 'Never lead with salary' } },
                { id: 'c3', text: { uz: 'Etihad Premier League sponsor', en: 'Etihad sponsors Premier League' }, nextNode: 'okay', xpDelta: 5, feedback: { uz: 'Yuzaki javob, ko\'proq qadriyat kerak', en: 'Surface answer, need more value' } },
              ],
            },
            good: { text: { uz: '✓ Recruiter ham\'jandi. Keyingi savol: "Describe a stressful situation"', en: '✓ Recruiter smiles. Next: "Describe a stressful situation"' }, isEnd: true, endFeedback: { uz: 'Mukammal — STAR formatida davom eting', en: 'Excellent — continue with STAR format' } },
              okay: { text: { uz: 'Recruiter savolni qaytaradi', en: 'Recruiter rephrases the question' }, isEnd: true, endFeedback: { uz: 'Qadriyatlar haqida ko\'proq tayyorgarlik kerak', en: 'Need more prep on values' } },
              bad: { text: { uz: 'Recruiter pauza qildi...', en: 'Recruiter pauses...' }, isEnd: true, endFeedback: { uz: 'Maoshi emas, passion va service ko\'rsating', en: 'Lead with passion and service, not pay' } },
          },
        }},
      ]},
    },
  ],
}

export const phase9: Phase = {
  id: 'phase-9', order: 9, titleKey: 'phases.9.title', descriptionKey: 'phases.9.desc',
  mechanic: 'simulation', estimatedDays: 7, unlockThreshold: 80,
  lessons: [
    {
      id: 'assessment-overview', titleKey: 'phases.9.title', type: 'text', xpReward: 50, durationMinutes: 25,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Assessment Day — to\'liq jarayon', en: 'Assessment Day — Full Walkthrough' } },
        { type: 'paragraph', text: { uz: 'Assessment Day 6-8 soat davom etadi. Har bir bosqich baholanadi va keyingisiga o\'tish qarori beriladi.', en: 'Assessment Day lasts 6-8 hours. Each stage is scored before moving to the next.' } },
        { type: 'list', items: [
          { uz: '08:00 — Ro\'yxatdan o\'tish va bo\'y / grooming tekshiruvi (CV bilan)', en: '08:00 — Check-in & height/grooming check (with CV)' },
          { uz: '09:00 — Kompaniya prezentatsiyasi (Etihad tarixi)', en: '09:00 — Company presentation (Etihad history)' },
          { uz: '10:00 — Reach test (212 cm tepa shkafga yetishi)', en: '10:00 — Reach test (212 cm overhead bin)' },
          { uz: '11:00 — Guruh mashqi (8-10 kishi, role-play)', en: '11:00 — Group exercise (8-10 people, role-play)' },
          { uz: '13:00 — Lunch break + 1-on-1 suhbat', en: '13:00 — Lunch break + 1-on-1 conversation' },
          { uz: '14:00 — Ingliz tili testi (yozma + ko\'rib chiqish)', en: '14:00 — English test (written + comprehension)' },
          { uz: '15:00 — Final intervyu (senior recruiter bilan)', en: '15:00 — Final interview (with senior recruiter)' },
          { uz: '17:00 — Conditional offer yoki rejection', en: '17:00 — Conditional offer or rejection' },
        ]},
      ]},
    },
    {
      id: 'group-exercise-prep', titleKey: 'phases.9.title', type: 'text', xpReward: 60, durationMinutes: 20,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Guruh mashqi — kuchli ko\'rinish', en: 'Group Exercise — Stand Out' } },
        { type: 'list', items: [
          { uz: '✓ 2-3 marta gapiring (kam = noaktiv, ko\'p = dominant)', en: '✓ Speak 2-3 times (too few = passive, too many = dominant)' },
          { uz: '✓ Boshqalarni nomlari bilan eslang ("As Maria said...")', en: '✓ Reference others by name ("As Maria said...")' },
          { uz: '✓ Tinch va yumshoq, lekin aniq ovoz', en: '✓ Calm, soft but clear voice' },
          { uz: '✓ Vaqtni eslating ("Bizda 5 daqiqa qoldi")', en: '✓ Track time ("We have 5 minutes left")' },
          { uz: '✗ Boshqalarni gapirishdan to\'xtatmang', en: '✗ Don\'t interrupt others' },
          { uz: '✗ Telefon, soat, qog\'oz bilan o\'ynamang', en: '✗ Don\'t fidget with phone, watch, paper' },
        ]},
        { type: 'quiz', quiz: { id: 'group-q', passingScore: 70, questions: [
          { id: 'g1', question: { uz: 'Guruh mashqida ideal gapirish soni?', en: 'Ideal speaking count in group exercise?' },
            options: [{ uz: '1 marta', en: 'Once' }, { uz: '2-3 marta', en: '2-3 times' }, { uz: '10+ marta', en: '10+ times' }, { uz: 'Hech narsa demaslik', en: 'Stay silent' }], correctIndex: 1 },
          { id: 'g2', question: { uz: 'Boshqa kandidatga qanday murojaat qilish kerak?', en: 'How to address other candidates?' },
            options: [{ uz: '"You"', en: '"You"' }, { uz: 'Ismi bilan', en: 'By their name' }, { uz: 'Hech qanday', en: 'Don\'t' }, { uz: '"Hey"', en: '"Hey"' }], correctIndex: 1 },
        ]}},
      ]},
    },
    {
      id: 'reach-test', titleKey: 'phases.9.title', type: 'text', xpReward: 40, durationMinutes: 15,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Reach Test — 212 cm', en: 'Reach Test — 212 cm' } },
        { type: 'paragraph', text: { uz: 'Tepa shkafga (overhead bin) yetish kabina ekipaji uchun majburiy. 212 cm — minimal balandlik.', en: 'Reaching the overhead bin is mandatory for cabin crew. 212 cm is the minimum.' } },
        { type: 'list', items: [
          { uz: 'Yalangoyoq tursa — bo\'y x 1.30 ≈ qo\'l balandligi', en: 'Barefoot — height × 1.30 ≈ reach height' },
          { uz: '163 cm → 212 cm (poyabzal bilan oson)', en: '163 cm → 212 cm (easy with shoes)' },
          { uz: 'Test paytida tabassum saqlang', en: 'Keep smiling during the test' },
          { uz: 'Oyoq uchida turish ruxsat etiladi', en: 'Standing on tiptoes is allowed' },
        ]},
      ]},
    },
  ],
}

export const phase10: Phase = {
  id: 'phase-10', order: 10, titleKey: 'phases.10.title', descriptionKey: 'phases.10.desc',
  mechanic: 'documents', estimatedDays: 5, unlockThreshold: 80,
  lessons: [
    {
      id: 'application-guide', titleKey: 'phases.10.title', type: 'text', xpReward: 50, durationMinutes: 20,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Etihad ga ariza berish — qadamlar', en: 'Applying to Etihad — Steps' } },
        { type: 'list', items: [
          { uz: '1. careers.etihad.com ga kiring', en: '1. Visit careers.etihad.com' },
          { uz: '2. "Cabin Crew" vakansiyani toping', en: '2. Find the "Cabin Crew" vacancy' },
          { uz: '3. CV ni yuklang (1 sahifa, professional formatda)', en: '3. Upload CV (1 page, professional format)' },
          { uz: '4. Screening savollarga "YES" javob bering', en: '4. Answer screening questions with "YES"' },
          { uz: '5. Skill assessment to\'ldiring (50 daqiqa)', en: '5. Complete skill assessment (50 min)' },
          { uz: '6. Application ID ni saqlang', en: '6. Save your application ID' },
        ]},
        { type: 'checklist', items: [
          { id: 'd1', label: { uz: 'Professional CV (1 sahifa)', en: 'Professional CV (1 page)' }, required: true },
          { id: 'd2', label: { uz: 'Studio foto (uniform-style)', en: 'Studio photo (uniform-style)' }, required: true },
          { id: 'd3', label: { uz: 'Pasport (6 oydan ko\'p amal qiladigan)', en: 'Passport (valid 6+ months)' }, required: true },
          { id: 'd4', label: { uz: 'Diplom (ingliz tilida)', en: 'Diploma (in English)' }, required: true },
          { id: 'd5', label: { uz: 'IELTS / TOEFL sertifikat (ixtiyoriy)', en: 'IELTS / TOEFL certificate (optional)' }, required: false },
        ]},
      ]},
    },
    {
      id: 'photo-standards', titleKey: 'phases.10.title', type: 'text', xpReward: 40, durationMinutes: 15,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Professional foto — talablar', en: 'Professional Photo — Requirements' } },
        { type: 'list', items: [
          { uz: '📐 To\'liq bo\'y foto + portret (2 ta)', en: '📐 Full-body + portrait (2 photos)' },
          { uz: '👔 Business attire — kostyum / kostyum-yubka', en: '👔 Business attire — suit or skirt suit' },
          { uz: '💄 Tabiiy makiyaj (qizil iyak yoki yaltiroq emas)', en: '💄 Natural makeup (no bright red lips, no glitter)' },
          { uz: '💇 Sochlar yig\'ilgan (bun yoki ponytail)', en: '💇 Hair tied back (bun or ponytail)' },
          { uz: '😊 Tabassum + ko\'z aloqa', en: '😊 Smile + eye contact' },
          { uz: '🎨 Oq yoki neytral fon', en: '🎨 White or neutral background' },
          { uz: '📸 Professional studio (selfie YO\'Q)', en: '📸 Professional studio (NO selfies)' },
        ]},
      ]},
    },
    {
      id: 'visa-medical', titleKey: 'phases.10.title', type: 'text', xpReward: 50, durationMinutes: 20,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Conditional Offer dan keyin', en: 'After Conditional Offer' } },
        { type: 'paragraph', text: { uz: 'Offer olganingizdan keyin 2-3 oy ichida Abu Dhabi ga ko\'chish kerak.', en: 'After receiving an offer, you have 2-3 months to relocate to Abu Dhabi.' } },
        { type: 'list', items: [
          { uz: '🏥 Medical test (HIV, Hep B/C, X-ray, vision, hearing)', en: '🏥 Medical test (HIV, Hep B/C, X-ray, vision, hearing)' },
          { uz: '📄 GCAA Class 2 sog\'liq sertifikati', en: '📄 GCAA Class 2 medical certificate' },
          { uz: '🛂 Employment visa (Etihad homiyligida)', en: '🛂 Employment visa (sponsored by Etihad)' },
          { uz: '✈️ Bir tomonlama bilet Abu Dhabi ga', en: '✈️ One-way ticket to Abu Dhabi' },
          { uz: '🏨 Crew accommodation — 8 hafta training davomida', en: '🏨 Crew accommodation — 8 weeks during training' },
          { uz: '📚 8 hafta training (SEP, service, grooming, swim)', en: '📚 8-week training (SEP, service, grooming, swim)' },
        ]},
      ]},
    },
  ],
}

export const phase11: Phase = {
  id: 'phase-11', order: 11, titleKey: 'phases.11.title', descriptionKey: 'phases.11.desc',
  mechanic: 'games', estimatedDays: 7, unlockThreshold: 80,
  lessons: [
    {
      id: 'games-intro', titleKey: 'phases.11.title', type: 'text', xpReward: 40, durationMinutes: 15,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Gamified testlar nima?', en: 'What are Gamified Tests?' } },
        { type: 'paragraph', text: { uz: 'Aviakompaniya recruitment da Arctic Shores, HireVue va Pymetrics platformalari ishlatiladi — mini-o\'yinlar orqali cognitive ko\'nikmalar baholanadi.', en: 'Airline recruitment uses Arctic Shores, HireVue and Pymetrics — mini-games to assess cognitive skills.' } },
        { type: 'list', items: [
          { uz: '🧠 Memory — qisqa muddatli xotira', en: '🧠 Memory — short-term recall' },
          { uz: '⚡ Reaction Time — reaksiya tezligi (200-300 ms ideal)', en: '⚡ Reaction Time — reaction speed (200-300 ms ideal)' },
          { uz: '🧩 Pattern Recognition — ketma-ketlikni topish', en: '🧩 Pattern Recognition — finding sequences' },
          { uz: '💬 SJT — Situational Judgment Test', en: '💬 SJT — Situational Judgment Test' },
          { uz: '🎯 Numerical reasoning — tezkor hisob-kitob', en: '🎯 Numerical reasoning — quick calculations' },
        ]},
      ]},
    },
    {
      id: 'sjt-deep-dive', titleKey: 'phases.11.title', type: 'text', xpReward: 60, durationMinutes: 25,
      content: { blocks: [
        { type: 'heading', text: { uz: 'SJT — Situational Judgment Test', en: 'SJT — Situational Judgment Test' } },
        { type: 'paragraph', text: { uz: 'SJT — eng muhim test. Vaziyat beriladi, eng yaxshi javobni tanlaysiz. "Customer first" + "Team first" mantrasi.', en: 'SJT is the most important test. A situation is presented; you pick the best response. "Customer first" + "Team first" mantra.' } },
        { type: 'list', items: [
          { uz: '✓ Always: Yo\'lovchining xavfsizligi → menejerga xabar → yordam', en: '✓ Always: Passenger safety → notify manager → assist' },
          { uz: '✓ Hech qachon: "Bilmayman", "Bu mening ishim emas"', en: '✓ Never: "I don\'t know", "Not my job"' },
          { uz: '✓ Team: hamkasbingizga yordam, lekin chegara saqlash', en: '✓ Team: help colleague, but maintain boundaries' },
          { uz: '✓ Cultural awareness — turli millat, dinlarni hurmat', en: '✓ Cultural awareness — respect for nationalities and religions' },
        ]},
        { type: 'quiz', quiz: { id: 'sjt-q', passingScore: 75, questions: [
          { id: 'sj1', question: { uz: 'Yo\'lovchi xizmatdan norozi va baqirmoqda. Birinchi qadam?', en: 'Angry passenger shouting at service. First step?' },
            options: [
              { uz: 'Javob qaytarish', en: 'Argue back' },
              { uz: 'Diqqat bilan tinglash, kechirim so\'rash', en: 'Listen calmly, apologize' },
              { uz: 'Boshqa hamkasbga uzatish', en: 'Pass to another crew' },
              { uz: 'E\'tibor bermay ketish', en: 'Ignore and walk away' },
            ], correctIndex: 1 },
          { id: 'sj2', question: { uz: 'Hamkasbingiz unutib qoldirgan vazifani ko\'rdingiz. Nima qilasiz?', en: 'Colleague forgot a task. What do you do?' },
            options: [
              { uz: 'Hisobot beraman', en: 'Report them' },
              { uz: 'Yashirin bajarib qo\'yaman', en: 'Quietly complete it' },
              { uz: 'Hamkasbga aytib, birga hal qilamiz', en: 'Tell colleague, solve together' },
              { uz: 'Yo\'lovchiga aytaman', en: 'Tell the passenger' },
            ], correctIndex: 2 },
          { id: 'sj3', question: { uz: 'Roza tutgan musulmon yo\'lovchiga alkogol taklif qilish?', en: 'Offering alcohol to a fasting Muslim passenger?' },
            options: [
              { uz: 'Albatta taklif qilaman', en: 'Always offer' },
              { uz: 'Faqat soft drink taklif', en: 'Offer only soft drinks' },
              { uz: 'Hech narsa taklif qilmayman', en: 'Offer nothing' },
              { uz: 'Roza haqida so\'rayman', en: 'Ask about fasting first' },
            ], correctIndex: 1 },
        ]}},
      ]},
    },
    {
      id: 'reaction-strategy', titleKey: 'phases.11.title', type: 'text', xpReward: 40, durationMinutes: 15,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Reaction & Memory testlari — strategiya', en: 'Reaction & Memory tests — strategy' } },
        { type: 'list', items: [
          { uz: '☕ 1 stakan kofe testdan 30 daqiqa oldin (reaksiya tezligi)', en: '☕ 1 cup of coffee 30 min before (reaction speed)' },
          { uz: '😴 Avval 7-8 soat uxlash — eng muhim', en: '😴 Sleep 7-8 hours the night before — most important' },
          { uz: '📱 Test paytida boshqa qurilma yo\'q', en: '📱 No other devices during test' },
          { uz: '🎮 Test Arena bo\'limida har kuni 10 daqiqa mashq', en: '🎮 Practice 10 min daily in Test Arena' },
          { uz: '🧘 Stress kam — taranglik reaksiya tezligini sekinlashtiradi', en: '🧘 Stay calm — tension slows reaction time' },
        ]},
      ]},
    },
  ],
}

export const phase12: Phase = {
  id: 'phase-12', order: 12, titleKey: 'phases.12.title', descriptionKey: 'phases.12.desc',
  mechanic: 'final', estimatedDays: 3, unlockThreshold: 80,
  lessons: [
    {
      id: 'final-mock', titleKey: 'phases.12.title', type: 'quiz', xpReward: 150, durationMinutes: 60,
      content: { blocks: [
        { type: 'heading', text: { uz: 'Final Mock — Etihad Readiness', en: 'Final Mock — Etihad Readiness' } },
        { type: 'paragraph', text: { uz: 'Yakuniy 12 ta savol — phase 0-11 dan. 85% va undan yuqori — siz tayyor.', en: 'Final 12 questions across phases 0-11. 85%+ means you are ready.' } },
        { type: 'quiz', quiz: { id: 'final-q', passingScore: 85, questions: [
          { id: 'fq1', question: { uz: 'Etihad minimum yosh?', en: 'Etihad minimum age?' },
            options: [{ uz: '18', en: '18' }, { uz: '21', en: '21' }, { uz: '25', en: '25' }, { uz: '30', en: '30' }], correctIndex: 1 },
          { id: 'fq2', question: { uz: 'Evakuatsiya vaqti (sertifikatsiya)?', en: 'Evacuation time (certification)?' },
            options: [{ uz: '60s', en: '60s' }, { uz: '90s', en: '90s' }, { uz: '120s', en: '120s' }, { uz: '180s', en: '180s' }], correctIndex: 1 },
          { id: 'fq3', question: { uz: 'Etihad hub?', en: 'Etihad hub?' },
            options: [{ uz: 'DXB', en: 'DXB' }, { uz: 'AUH', en: 'AUH' }, { uz: 'DOH', en: 'DOH' }, { uz: 'LHR', en: 'LHR' }], correctIndex: 1 },
          { id: 'fq4', question: { uz: 'STAR "R" nimani anglatadi?', en: 'STAR "R" stands for?' },
            options: [{ uz: 'Reason', en: 'Reason' }, { uz: 'Result', en: 'Result' }, { uz: 'Response', en: 'Response' }, { uz: 'Role', en: 'Role' }], correctIndex: 1 },
          { id: 'fq5', question: { uz: 'Galley nima?', en: 'What is galley?' },
            options: [{ uz: 'Kitchen', en: 'Kitchen' }, { uz: 'Toilet', en: 'Toilet' }, { uz: 'Cockpit', en: 'Cockpit' }, { uz: 'Exit', en: 'Exit' }], correctIndex: 0 },
          { id: 'fq6', question: { uz: 'Reach test balandligi?', en: 'Reach test height?' },
            options: [{ uz: '200 cm', en: '200 cm' }, { uz: '210 cm', en: '210 cm' }, { uz: '212 cm', en: '212 cm' }, { uz: '220 cm', en: '220 cm' }], correctIndex: 2 },
          { id: 'fq7', question: { uz: 'Etihad minimum bo\'y (cm)?', en: 'Etihad minimum height (cm)?' },
            options: [{ uz: '158', en: '158' }, { uz: '160', en: '160' }, { uz: '163', en: '163' }, { uz: '170', en: '170' }], correctIndex: 2 },
          { id: 'fq8', question: { uz: 'Roza tutgan yo\'lovchiga nima taklif?', en: 'Offer to a fasting passenger?' },
            options: [{ uz: 'Alcohol', en: 'Alcohol' }, { uz: 'Faqat soft drink', en: 'Soft drink only' }, { uz: 'Hech narsa', en: 'Nothing' }, { uz: 'Faqat suv', en: 'Water only' }], correctIndex: 1 },
          { id: 'fq9', question: { uz: 'Boss exit row da qancha yo\'lovchi joylashtirish mumkin?', en: 'Max passengers per Boeing exit row?' },
            options: [{ uz: 'Cheklov yo\'q', en: 'No limit' }, { uz: 'Faqat sog\'lom kattalar (16+)', en: 'Only able adults 16+' }, { uz: 'Faqat ayollar', en: 'Only women' }, { uz: 'Faqat erkaklar', en: 'Only men' }], correctIndex: 1 },
          { id: 'fq10', question: { uz: 'Decompression — birinchi qadam?', en: 'Decompression — first step?' },
            options: [{ uz: 'Yo\'lovchini tinchlantirish', en: 'Calm passenger' }, { uz: 'O\'zingizga oxygen mask kiyish', en: 'Don own oxygen mask first' }, { uz: 'Suv tarqatish', en: 'Distribute water' }, { uz: 'Cockpit ga yugurish', en: 'Run to cockpit' }], correctIndex: 1 },
          { id: 'fq11', question: { uz: 'Etihad training davomiyligi?', en: 'Etihad training duration?' },
            options: [{ uz: '2 hafta', en: '2 weeks' }, { uz: '4 hafta', en: '4 weeks' }, { uz: '8 hafta', en: '8 weeks' }, { uz: '12 hafta', en: '12 weeks' }], correctIndex: 2 },
          { id: 'fq12', question: { uz: 'Etihad uniform rangi?', en: 'Etihad uniform colour?' },
            options: [{ uz: 'Qora va oltin', en: 'Black & gold' }, { uz: 'Jigarrang va oltin', en: 'Brown & gold' }, { uz: 'Ko\'k va oltin', en: 'Blue & gold' }, { uz: 'Yashil', en: 'Green' }], correctIndex: 1 },
        ]}},
      ]},
    },
  ],
}
