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
        ]}},
      ]},
    },
  ],
}

export const phase8: Phase = {
  id: 'phase-8', order: 8, titleKey: 'phases.8.title', descriptionKey: 'phases.8.desc',
  mechanic: 'video', estimatedDays: 10, unlockThreshold: 80,
  lessons: [{
    id: 'interview-prep', titleKey: 'phases.8.title', type: 'text', xpReward: 50, durationMinutes: 30,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Intervyu tayyorgarligi', en: 'Interview Preparation' } },
      { type: 'list', items: [
        { uz: 'Video intervyu — 2 daqiqalik javoblar', en: 'Video interview — 2-minute answers' },
        { uz: '1-on-1 suhbat — motivatsiya va tajriba', en: '1-on-1 conversation — motivation & experience' },
        { uz: 'Guruh mashqi — teamwork va communication', en: 'Group exercise — teamwork & communication' },
        { uz: 'Professional kiyinish', en: 'Professional attire' },
        { uz: 'Eye contact va tabassum', en: 'Eye contact and smile' },
      ]},
    ]},
  }, {
    id: 'common-questions', titleKey: 'phases.8.title', type: 'quiz', xpReward: 75, durationMinutes: 25,
    content: { blocks: [{ type: 'quiz', quiz: { id: 'int-q', passingScore: 70, questions: [
      { id: 'iq1', question: { uz: 'Video intervyuda eng muhim nima?', en: 'Most important in video interview?' },
        options: [{ uz: 'Fon', en: 'Background' }, { uz: 'Tabassum, aniq gapirish, ko\'z aloqa', en: 'Smile, clear speech, eye contact' }, { uz: 'Kiyim', en: 'Clothing only' }, { uz: 'Uzun javob', en: 'Long answers' }], correctIndex: 1 },
    ]}}]},
  }],
}

export const phase9: Phase = {
  id: 'phase-9', order: 9, titleKey: 'phases.9.title', descriptionKey: 'phases.9.desc',
  mechanic: 'simulation', estimatedDays: 7, unlockThreshold: 80,
  lessons: [{
    id: 'assessment-overview', titleKey: 'phases.9.title', type: 'text', xpReward: 50, durationMinutes: 20,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Assessment Day — to\'liq jarayon', en: 'Assessment Day — Full Process' } },
      { type: 'list', items: [
        { uz: '1. Bo\'y va grooming tekshiruvi', en: '1. Height & grooming check' },
        { uz: '2. 1-on-1 motivatsiya suhbati', en: '2. 1-on-1 motivation interview' },
        { uz: '3. Guruh mashqi / role-play', en: '3. Group exercise / role-play' },
        { uz: '4. Yakuniy intervyu', en: '4. Final interview' },
        { uz: '5. Ingliz tili testi', en: '5. English proficiency test' },
      ]},
    ]},
  }],
}

export const phase10: Phase = {
  id: 'phase-10', order: 10, titleKey: 'phases.10.title', descriptionKey: 'phases.10.desc',
  mechanic: 'documents', estimatedDays: 3, unlockThreshold: 80,
  lessons: [{
    id: 'application-guide', titleKey: 'phases.10.title', type: 'text', xpReward: 50, durationMinutes: 20,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Etihad ga ariza berish', en: 'Applying to Etihad' } },
      { type: 'list', items: [
        { uz: '1. careers.etihad.com ga kiring', en: '1. Go to careers.etihad.com' },
        { uz: '2. CV yuklang', en: '2. Upload your CV' },
        { uz: '3. Savollarga javob bering (hammasi YES)', en: '3. Answer questions (all YES)' },
        { uz: '4. Skill assessment to\'ldiring', en: '4. Complete skill assessment' },
        { uz: '5. Submit application', en: '5. Submit application' },
      ]},
      { type: 'checklist', items: [
        { id: 'd1', label: { uz: 'CV tayyor', en: 'CV ready' }, required: true },
        { id: 'd2', label: { uz: 'Professional foto', en: 'Professional photo' }, required: true },
        { id: 'd3', label: { uz: 'Pasport nusxasi', en: 'Passport copy' }, required: true },
        { id: 'd4', label: { uz: 'Diplom nusxasi', en: 'Diploma copy' }, required: true },
      ]},
    ]},
  }],
}

export const phase11: Phase = {
  id: 'phase-11', order: 11, titleKey: 'phases.11.title', descriptionKey: 'phases.11.desc',
  mechanic: 'games', estimatedDays: 7, unlockThreshold: 80,
  lessons: [{
    id: 'games-intro', titleKey: 'phases.11.title', type: 'text', xpReward: 40, durationMinutes: 15,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Gamified testlar', en: 'Gamified Tests' } },
      { type: 'paragraph', text: { uz: 'Airline recruitment da memory, reaction time, pattern recognition va SJT testlari ishlatiladi.', en: 'Airline recruitment uses memory, reaction time, pattern recognition, and SJT tests.' } },
    ]},
  }],
}

export const phase12: Phase = {
  id: 'phase-12', order: 12, titleKey: 'phases.12.title', descriptionKey: 'phases.12.desc',
  mechanic: 'final', estimatedDays: 2, unlockThreshold: 80,
  lessons: [{
    id: 'final-mock', titleKey: 'phases.12.title', type: 'quiz', xpReward: 150, durationMinutes: 60,
    content: { blocks: [
      { type: 'heading', text: { uz: 'Final Mock — Etihad Readiness', en: 'Final Mock — Etihad Readiness' } },
      { type: 'quiz', quiz: { id: 'final-q', passingScore: 85, questions: [
        { id: 'fq1', question: { uz: 'Etihad minimum yosh?', en: 'Etihad minimum age?' },
          options: [{ uz: '18', en: '18' }, { uz: '21', en: '21' }, { uz: '25', en: '25' }, { uz: '30', en: '30' }], correctIndex: 1 },
        { id: 'fq2', question: { uz: 'Evakuatsiya vaqti?', en: 'Evacuation time?' },
          options: [{ uz: '60s', en: '60s' }, { uz: '90s', en: '90s' }, { uz: '120s', en: '120s' }, { uz: '180s', en: '180s' }], correctIndex: 1 },
        { id: 'fq3', question: { uz: 'Etihad hub?', en: 'Etihad hub?' },
          options: [{ uz: 'DXB', en: 'DXB' }, { uz: 'AUH', en: 'AUH' }, { uz: 'DOH', en: 'DOH' }, { uz: 'LHR', en: 'LHR' }], correctIndex: 1 },
        { id: 'fq4', question: { uz: 'STAR "R" nimani anglatadi?', en: 'STAR "R" stands for?' },
          options: [{ uz: 'Reason', en: 'Reason' }, { uz: 'Result', en: 'Result' }, { uz: 'Response', en: 'Response' }, { uz: 'Role', en: 'Role' }], correctIndex: 1 },
        { id: 'fq5', question: { uz: 'Galley nima?', en: 'What is galley?' },
          options: [{ uz: 'Kitchen', en: 'Kitchen' }, { uz: 'Toilet', en: 'Toilet' }, { uz: 'Cockpit', en: 'Cockpit' }, { uz: 'Exit', en: 'Exit' }], correctIndex: 0 },
      ]}},
    ]},
  }],
}
