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
      { type: 'heading', text: { uz: 'Birinchi yordam', en: 'First Aid' } },
      { type: 'list', items: [
        { uz: 'CPR — yurak-qon tomir reanimatsiya', en: 'CPR — cardiopulmonary resuscitation' },
        { uz: 'AED — avtomatik defibrilyator', en: 'AED — automated external defibrillator' },
        { uz: 'Choking — bo\'g\'ilib qolish', en: 'Choking — Heimlich maneuver' },
        { uz: 'Allergic reaction — allergik reaksiya', en: 'Allergic reaction' },
        { uz: 'Fainting — hushidan ketish', en: 'Fainting/syncope' },
        { uz: 'Medical kit — tibbiy sumka', en: 'Onboard medical kit' },
      ]},
    ]},
  }, {
    id: 'firstaid-scenarios', titleKey: 'phases.6.title', type: 'scenario', xpReward: 75, durationMinutes: 30,
    content: { blocks: [{ type: 'scenario', scenario: {
      id: 'fa1', startNode: 'start',
      nodes: {
        start: { text: { uz: 'Yo\'lovchi hushidan ketdi. Nima qilasiz?', en: 'A passenger fainted. What do you do?' },
          choices: [
            { id: 'c1', text: { uz: 'Bosh ekipajni xabar qilaman, tibbiy yordam ko\'rsataman', en: 'Notify flight deck, provide medical assistance' }, nextNode: 'good', xpDelta: 20, feedback: { uz: 'To\'g\'ri!', en: 'Correct!' } },
            { id: 'c2', text: { uz: 'Hech narsa qilmayman', en: 'Do nothing' }, nextNode: 'bad', xpDelta: -20, feedback: { uz: 'Har doim yordam bering!', en: 'Always provide assistance!' } },
          ]},
        good: { isEnd: true, text: { uz: 'Yo\'lovchi tiklandi.', en: 'Passenger recovered.' }, endFeedback: { uz: 'Professional!', en: 'Professional!' } },
        bad: { isEnd: true, text: { uz: 'Vaziyat yomonlashdi.', en: 'Situation worsened.' }, endFeedback: { uz: 'Har doim harakat qiling.', en: 'Always take action.' } },
      },
    }}]},
  }],
}
