import type { Phase } from '@/types'

export const phase3: Phase = {
  id: 'phase-3', order: 3, titleKey: 'phases.3.title', descriptionKey: 'phases.3.desc',
  mechanic: 'checklist', estimatedDays: 3, unlockThreshold: 80,
  lessons: [{
    id: 'grooming-standards', titleKey: 'phases.3.title', type: 'checklist', xpReward: 50, durationMinutes: 20,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Grooming standartlari', en: 'Grooming Standards' } },
      { type: 'paragraph', text: { uz: 'Etihad yuqori darajadagi tashqi ko\'rinish talab qiladi. Uniformda tatu va pirsing ko\'rinmasligi kerak.', en: 'Etihad requires high grooming standards. No visible tattoos or piercings in uniform.' } },
      { type: 'checklist', items: [
        { id: 'g1', label: { uz: 'Sochlar toza va professional', en: 'Clean, professional hair' }, required: true },
        { id: 'g2', label: { uz: 'Tirnoqlar toza va qisqa', en: 'Clean, short nails' }, required: true },
        { id: 'g3', label: { uz: 'Yuz terisi toza va tabiiy', en: 'Clean, natural skin' }, required: true },
        { id: 'g4', label: { uz: 'Tatu ko\'rinmaydi', en: 'No visible tattoos' }, required: true },
        { id: 'g5', label: { uz: 'Pirsing ko\'rinmaydi (ayollar: bitta sirg\'a)', en: 'No visible piercings (females: one earring per lobe)' }, required: true },
        { id: 'g6', label: { uz: 'Makiyaj professional va kam', en: 'Professional, minimal makeup' }, required: false },
      ]},
    ]},
  }, {
    id: 'grooming-quiz', titleKey: 'phases.3.title', type: 'quiz', xpReward: 60, durationMinutes: 15,
    content: { blocks: [{ type: 'quiz', quiz: { id: 'grooming-q', passingScore: 80, questions: [
      { id: 'gq1', question: { uz: 'Ayollar uchun qancha sirg\'a ruxsat?', en: 'How many earrings allowed for females?' },
        options: [{ uz: '0', en: '0' }, { uz: '1 har quloqda', en: '1 per lobe' }, { uz: '3', en: '3' }, { uz: 'Cheklovsiz', en: 'Unlimited' }], correctIndex: 1 },
      { id: 'gq2', question: { uz: 'Tatu qoplam (bandage) bilan yashirish mumkinmi?', en: 'Can tattoos be covered with bandage?' },
        options: [{ uz: 'Ha', en: 'Yes' }, { uz: 'Yo\'q', en: 'No' }, { uz: 'Faqat kichik', en: 'Only small ones' }, { uz: 'Faqat erkaklar', en: 'Only males' }], correctIndex: 1 },
    ]}}]},
  }],
}

export const phase4: Phase = {
  id: 'phase-4', order: 4, titleKey: 'phases.4.title', descriptionKey: 'phases.4.desc',
  mechanic: 'scenario', estimatedDays: 10, unlockThreshold: 80,
  lessons: [{
    id: 'service-basics', titleKey: 'phases.4.title', type: 'text', xpReward: 50, durationMinutes: 25,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Mijozlarga xizmat ko\'rsatish', en: 'Customer Service Excellence' } },
      { type: 'paragraph', text: { uz: 'Kabina ekipaji mehmonlarga innovativ va samimiy xizmat ko\'rsatadi. Har bir yo\'lovchi muhim.', en: 'Cabin crew delivers innovative and genuine hospitality. Every guest matters.' } },
      { type: 'list', items: [
        { uz: 'Smile & Eye Contact — tabassum va ko\'z aloqa', en: 'Smile & Eye Contact' },
        { uz: 'Active Listening — faol tinglash', en: 'Active Listening' },
        { uz: 'Empathy — hamdardlik', en: 'Empathy' },
        { uz: 'Problem Solving — muammoni hal qilish', en: 'Problem Solving' },
        { uz: 'Going the Extra Mile — qo\'shimcha e\'tibor', en: 'Going the Extra Mile' },
      ]},
    ]},
  }, {
    id: 'service-scenario-1', titleKey: 'phases.4.title', type: 'scenario', xpReward: 75, durationMinutes: 30,
    content: { blocks: [{ type: 'scenario', scenario: {
      id: 'sc1', startNode: 'start',
      nodes: {
        start: { text: { uz: 'Yo\'lovchi o\'z o\'rindig\'i band ekanligini aytmoqda va g\'azablangan.', en: 'A passenger says their seat is taken and appears angry.' },
          choices: [
            { id: 'c1', text: { uz: 'Xotirjam bo\'ling, darhol yordam beraman', en: 'Stay calm, I will help you immediately' }, nextNode: 'good', xpDelta: 20, feedback: { uz: 'A\'lo! Xotirjamlik va empatiya.', en: 'Excellent! Calm and empathy.' } },
            { id: 'c2', text: { uz: 'Bu sizning muammongiz emas', en: 'That is not my problem' }, nextNode: 'bad', xpDelta: -10, feedback: { uz: 'Noto\'g\'ri. Hech qachon bunday demang.', en: 'Wrong. Never say this.' } },
            { id: 'c3', text: { uz: 'Boshqa ekipajni chaqiraman va ketaman', en: 'Call another crew and leave' }, nextNode: 'bad', xpDelta: -5, feedback: { uz: 'Mas\'uliyatni qochish yomon.', en: 'Avoiding responsibility is poor service.' } },
          ]},
        good: { text: { uz: 'Siz yo\'lovchining bording passini tekshirdingiz va to\'g\'ri o\'rindiqni topdingiz.', en: 'You checked the boarding pass and found the correct seat.' }, isEnd: true, endFeedback: { uz: 'A\'lo xizmat!', en: 'Excellent service!' } },
        bad: { text: { uz: 'Yo\'lovchi yanada g\'azablana boshladi.', en: 'The passenger became more upset.' }, isEnd: true, endFeedback: { uz: 'Yaxshiroq javob o\'ylab ko\'ring.', en: 'Think of a better response.' } },
      },
    }}]},
  }, {
    id: 'service-scenario-2', titleKey: 'phases.4.title', type: 'scenario', xpReward: 75, durationMinutes: 30,
    content: { blocks: [{ type: 'scenario', scenario: {
      id: 'sc2', startNode: 'start',
      nodes: {
        start: { text: { uz: 'Bolalar o\'ynab, boshqa yo\'lovchilarni bezovta qilmoqda.', en: 'Children are playing and disturbing other passengers.' },
          choices: [
            { id: 'c1', text: { uz: 'Ota-onaga muloyimlik bilan murojaat qilaman', en: 'Politely address the parents' }, nextNode: 'good', xpDelta: 20, feedback: { uz: 'To\'g\'ri yondashuv!', en: 'Correct approach!' } },
            { id: 'c2', text: { uz: 'Bolalarni qattiq ogohlantiraman', en: 'Strictly warn the children' }, nextNode: 'bad', xpDelta: -5, feedback: { uz: 'Avval ota-onaga murojaat qiling.', en: 'Address parents first.' } },
          ]},
        good: { isEnd: true, text: { uz: 'Ota-ona bolalarni tinchlantirdi.', en: 'Parents calmed the children.' }, endFeedback: { uz: 'Professional yechim!', en: 'Professional solution!' } },
        bad: { isEnd: true, text: { uz: 'Vaziyat yomonlashdi.', en: 'Situation worsened.' }, endFeedback: { uz: 'Muloyimlik muhim.', en: 'Courtesy is key.' } },
      },
    }}]},
  }],
}

export const phase5: Phase = {
  id: 'phase-5', order: 5, titleKey: 'phases.5.title', descriptionKey: 'phases.5.desc',
  mechanic: 'drill', estimatedDays: 14, unlockThreshold: 80,
  lessons: [{
    id: 'sep-intro', titleKey: 'phases.5.title', type: 'text', xpReward: 50, durationMinutes: 30,
    content: { blocks: [
      { type: 'heading', text: { uz: 'SEP — Xavfsizlik va favqulodda vaziyatlar', en: 'SEP — Safety & Emergency Procedures' } },
      { type: 'paragraph', text: { uz: 'Kabina ekipajining birinchi vazifasi — xavfsizlik. SEP treningi eng muhim qism.', en: 'Cabin crew\'s primary duty is safety. SEP training is the most critical part.' } },
      { type: 'list', items: [
        { uz: 'Evakuatsiya — 90 soniyada samolyotni bo\'shatish', en: 'Evacuation — empty aircraft in 90 seconds' },
        { uz: 'Fire & Smoke — yong\'in va tutun', en: 'Fire & Smoke procedures' },
        { uz: 'Decompression — bosim tushishi', en: 'Decompression' },
        { uz: 'Ditching — suvga qo\'nish', en: 'Ditching (water landing)' },
        { uz: 'Door operation — eshik ochish/yopish', en: 'Door operation' },
      ]},
    ]},
  }, {
    id: 'sep-evacuation', titleKey: 'phases.5.title', type: 'interactive', xpReward: 80, durationMinutes: 35,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Evakuatsiya drill', en: 'Evacuation Drill' } },
      { type: 'list', items: [
        { uz: '1. "Brace, Brace" — tayyorlaning', en: '1. "Brace, Brace" — prepare' },
        { uz: '2. "Evacuate, Evacuate" — evakuatsiya', en: '2. "Evacuate, Evacuate" — evacuate' },
        { uz: '3. Eshiklarni oching (slide deploy)', en: '3. Open doors (deploy slides)' },
        { uz: '4. Yo\'lovchilarni yo\'naltiring', en: '4. Direct passengers' },
        { uz: '5. 90 soniya ichida bo\'shating', en: '5. Empty in 90 seconds' },
      ]},
      { type: 'quiz', quiz: { id: 'sep-q', passingScore: 80, questions: [
        { id: 'sq1', question: { uz: 'Evakuatsiya vaqti qancha?', en: 'Evacuation time limit?' },
          options: [{ uz: '60 soniya', en: '60 seconds' }, { uz: '90 soniya', en: '90 seconds' }, { uz: '120 soniya', en: '120 seconds' }, { uz: '5 daqiqa', en: '5 minutes' }], correctIndex: 1 },
      ]}},
    ]},
  }, {
    id: 'sep-fire', titleKey: 'phases.5.title', type: 'text', xpReward: 60, durationMinutes: 25,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Yong\'in va tutun', en: 'Fire and Smoke' } },
      { type: 'list', items: [
        { uz: 'Halon/HAFEX o\'t o\'chirgich ishlatish', en: 'Use Halon/HAFEX extinguisher' },
        { uz: 'Battery fire — lithium batareya yong\'ini', en: 'Battery fire — lithium battery' },
        { uz: 'Lavatory fire — hojatxona yong\'ini', en: 'Lavatory fire procedures' },
        { uz: 'Smoke hood — tutun qopqog\'i', en: 'Protective Breathing Equipment' },
      ]},
    ]},
  }],
}

export const phase6: Phase = {
  id: 'phase-6', order: 6, titleKey: 'phases.6.title', descriptionKey: 'phases.6.desc',
  mechanic: 'timed-game', estimatedDays: 7, unlockThreshold: 80,
  lessons: [{
    id: 'firstaid-intro', titleKey: 'phases.6.title', type: 'text', xpReward: 50, durationMinutes: 25,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Birinchi yordam — asoslari', en: 'First Aid — Basics' } },
      { type: 'paragraph', text: { uz: 'Borda doctor yo\'q bo\'lsa, kabina ekipaji birinchi yordam ko\'rsatuvchi. ABCDE — primary survey usuli.', en: 'When no doctor is onboard, cabin crew are the first responders. Use ABCDE primary survey.' } },
      { type: 'list', items: [
        { uz: 'A — Airway (havo yo\'li ochiqmi?)', en: 'A — Airway (is it clear?)' },
        { uz: 'B — Breathing (nafas olyaptimi?)', en: 'B — Breathing (rate & quality?)' },
        { uz: 'C — Circulation (puls bormi?)', en: 'C — Circulation (pulse?)' },
        { uz: 'D — Disability (hushyorlik darajasi)', en: 'D — Disability (consciousness)' },
        { uz: 'E — Exposure (qo\'shimcha shikastlar)', en: 'E — Exposure (other injuries)' },
      ]},
    ]},
  }, {
    id: 'cpr-aed', titleKey: 'phases.6.title', type: 'text', xpReward: 75, durationMinutes: 30,
    content: { blocks: [
      { type: 'heading', text: { uz: 'CPR + AED — Yurakni qayta yo\'lga solish', en: 'CPR + AED — Cardiac Resuscitation' } },
      { type: 'paragraph', text: { uz: 'Kattalar uchun: 30 ko\'krak siqish + 2 nafas berish. 100-120 bpm tezlikda. 5-6 cm chuqurlikda.', en: 'For adults: 30 chest compressions + 2 breaths. 100-120 bpm rate. 5-6 cm depth.' } },
      { type: 'list', items: [
        { uz: '1. Hushyorlikni tekshiring ("Eshityapsizmi?")', en: '1. Check responsiveness ("Can you hear me?")' },
        { uz: '2. Yordam chaqiring + AED ni so\'rang', en: '2. Call for help + request AED' },
        { uz: '3. Nafas + puls 10 soniya tekshiring', en: '3. Check breathing + pulse for 10 seconds' },
        { uz: '4. CPR boshlang: 30:2 sikl, 100-120 bpm', en: '4. Start CPR: 30:2 cycle at 100-120 bpm' },
        { uz: '5. AED tayyor bo\'lganda yopishtiring', en: '5. Attach AED pads when ready' },
        { uz: '6. AED ko\'rsatmasiga rioya qiling', en: '6. Follow AED voice prompts' },
      ]},
      { type: 'quiz', quiz: { id: 'cpr-q', passingScore: 80, questions: [
        { id: 'cpr1', question: { uz: 'CPR tezligi (bpm)?', en: 'CPR rate (bpm)?' },
          options: [{ uz: '60-80', en: '60-80' }, { uz: '100-120', en: '100-120' }, { uz: '140-160', en: '140-160' }, { uz: '180-200', en: '180-200' }], correctIndex: 1 },
        { id: 'cpr2', question: { uz: 'Ko\'krak siqish chuqurligi (kattalar)?', en: 'Compression depth (adults)?' },
          options: [{ uz: '2-3 cm', en: '2-3 cm' }, { uz: '5-6 cm', en: '5-6 cm' }, { uz: '8-10 cm', en: '8-10 cm' }, { uz: '12 cm', en: '12 cm' }], correctIndex: 1 },
        { id: 'cpr3', question: { uz: 'CPR siklini qancha vaqt davom ettirish?', en: 'Continue CPR cycle until?' },
          options: [{ uz: '5 daqiqa', en: '5 minutes' }, { uz: 'Tibbiyot xodimi keladi yoki AED', en: 'Medical help arrives or AED available' }, { uz: '1 marotaba', en: 'Once' }, { uz: 'Yo\'lovchi qaytadan nafas oladi', en: 'Patient breathes again' }], correctIndex: 1 },
      ]}},
    ]},
  }, {
    id: 'choking-heimlich', titleKey: 'phases.6.title', type: 'text', xpReward: 60, durationMinutes: 20,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Choking — Heimlich manyovri', en: 'Choking — Heimlich Maneuver' } },
      { type: 'list', items: [
        { uz: 'Yo\'lovchi qo\'lini bo\'g\'ziga olib bordi → bo\'g\'ilish belgisi', en: 'Hand to throat = universal choking sign' },
        { uz: '1. "Bo\'g\'ilyapsizmi?" deb so\'rang', en: '1. Ask: "Are you choking?"' },
        { uz: '2. Orqasiga turing, mushtni nafas yo\'lining ostiga qo\'ying', en: '2. Stand behind, fist below ribcage' },
        { uz: '3. Tepaga va ichkariga 5 marta tortib chiqaring', en: '3. Sharp inward/upward thrusts × 5' },
        { uz: '4. 5 ta orqa zarba bilan almashtiring', en: '4. Alternate with 5 back blows' },
        { uz: '5. Yo\'lovchi hushidan ketsa — CPR boshlang', en: '5. If unconscious — start CPR' },
        { uz: '⚠️ Homilador / semiz: ko\'krak siqish (qorin emas)', en: '⚠️ Pregnant / obese: chest thrusts (not abdominal)' },
      ]},
    ]},
  }, {
    id: 'firstaid-scenarios', titleKey: 'phases.6.title', type: 'scenario', xpReward: 75, durationMinutes: 30,
    content: { blocks: [{ type: 'scenario', scenario: {
      id: 'fa1', startNode: 'start',
      nodes: {
        start: { text: { uz: 'Yo\'lovchi 30 yoshli erkak, ovqat paytida birdan qo\'lini bo\'g\'ziga olib keldi va nafas ololmayapti.', en: 'A 30-year-old male suddenly grabs his throat during meal and cannot breathe.' },
          choices: [
            { id: 'c1', text: { uz: 'Suv beraman', en: 'Give water' }, nextNode: 'bad', xpDelta: -10, feedback: { uz: 'Suv vaziyatni yomonlashtiradi', en: 'Water worsens choking' } },
            { id: 'c2', text: { uz: 'Heimlich manyovri (5 orqa zarba + 5 qorin siqish)', en: 'Heimlich (5 back blows + 5 abdominal thrusts)' }, nextNode: 'good', xpDelta: 25, feedback: { uz: 'A\'lo! To\'g\'ri usul', en: 'Excellent! Correct technique' } },
            { id: 'c3', text: { uz: 'Suvga qo\'yib, kutaman', en: 'Sit down and wait' }, nextNode: 'bad', xpDelta: -15, feedback: { uz: 'Vaqt yo\'qotmang', en: 'Do not lose time' } },
          ]},
        good: { text: { uz: 'Ovqat bo\'lagi chiqdi, yo\'lovchi nafas oldi.', en: 'Food dislodged, passenger breathes again.' },
          choices: [
            { id: 'c4', text: { uz: 'Tibbiyot xodimini chaqiraman', en: 'Call medical professional onboard' }, nextNode: 'gold', xpDelta: 15, feedback: { uz: 'To\'g\'ri — keyingi monitoring kerak', en: 'Right — follow-up monitoring needed' } },
            { id: 'c5', text: { uz: 'Bo\'ldi, ish tugadi', en: 'Done, move on' }, nextNode: 'okay', xpDelta: 0, feedback: { uz: 'Doim takroriy tekshirish', en: 'Always re-assess' } },
          ]},
        gold: { isEnd: true, text: { uz: 'Pilot xabardor qilindi, yo\'lovchi kuzatuvda.', en: 'Pilot informed, passenger under observation.' }, endFeedback: { uz: 'Mukammal javob!', en: 'Perfect response!' } },
        okay: { isEnd: true, text: { uz: 'Yo\'lovchi yaxshi, lekin protokol to\'liq emas', en: 'Passenger OK but protocol incomplete' }, endFeedback: { uz: 'Doim flight deck ga xabar bering', en: 'Always notify the flight deck' } },
        bad: { isEnd: true, text: { uz: 'Yo\'lovchi hushidan ketdi, CPR boshlash kerak.', en: 'Passenger lost consciousness, CPR required.' }, endFeedback: { uz: 'Tezroq Heimlich kerak edi', en: 'Should have used Heimlich immediately' } },
      },
    }}]},
  }, {
    id: 'allergic-reaction', titleKey: 'phases.6.title', type: 'text', xpReward: 55, durationMinutes: 20,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Anaphylaxis — og\'ir allergik reaksiya', en: 'Anaphylaxis — Severe Allergic Reaction' } },
      { type: 'list', items: [
        { uz: '🚨 Belgilar: shishish, qichishish, qiyin nafas, terining ko\'kishi', en: '🚨 Signs: swelling, itching, difficulty breathing, blue skin' },
        { uz: '1. EpiPen (Adrenalin) — son sirtqi tomonida 10 soniya', en: '1. EpiPen (Epinephrine) — outer thigh, hold 10 sec' },
        { uz: '2. Yo\'lovchini chalqancha yotqizing, oyoqlarni ko\'taring', en: '2. Lay supine, elevate legs' },
        { uz: '3. Oxygen mask qo\'ying (agar bor)', en: '3. Apply oxygen mask if available' },
        { uz: '4. Captain ga xabar — emergency diversion mumkin', en: '4. Inform captain — possible diversion' },
        { uz: '5. 5-15 daqiqada qaytarish mumkin', en: '5. May need to repeat dose in 5-15 min' },
      ]},
      { type: 'quiz', quiz: { id: 'allergy-q', passingScore: 80, questions: [
        { id: 'al1', question: { uz: 'EpiPen qaerga uriladi?', en: 'Where to inject EpiPen?' },
          options: [{ uz: 'Qo\'l venasi', en: 'Arm vein' }, { uz: 'Son sirtqi muskuli', en: 'Outer thigh muscle' }, { uz: 'Yelka', en: 'Shoulder' }, { uz: 'Qorin', en: 'Abdomen' }], correctIndex: 1 },
        { id: 'al2', question: { uz: 'Anaphylaxis vaqtida birinchi ish?', en: 'First action in anaphylaxis?' },
          options: [{ uz: 'Suv berish', en: 'Give water' }, { uz: 'EpiPen', en: 'EpiPen' }, { uz: 'Tinchlantirish', en: 'Calm them' }, { uz: 'Kutish', en: 'Wait it out' }], correctIndex: 1 },
      ]}},
    ]},
  }],
}
