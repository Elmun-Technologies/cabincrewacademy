import type { Phase } from '@/types'

export const phase2: Phase = {
  id: 'phase-2',
  order: 2,
  titleKey: 'phases.2.title',
  descriptionKey: 'phases.2.desc',
  mechanic: 'timeline',
  estimatedDays: 7,
  unlockThreshold: 80,
  lessons: [
    {
      id: 'etihad-history',
      titleKey: 'phases.2.title',
      type: 'text',
      xpReward: 50,
      durationMinutes: 25,
      content: {
        blocks: [
          {
            type: 'heading',
            text: { uz: 'Etihad Airways haqida', en: 'About Etihad Airways' },
          },
          {
            type: 'paragraph',
            text: {
              uz: 'Etihad Airways 2003 yilda Abu Dhabi, BAA da tashkil etilgan. UAE milliy aviakompaniyasi bo\'lib, "Etihad" so\'zi "ittifoq" degan ma\'noni anglatadi.',
              en: 'Etihad Airways was founded in 2003 in Abu Dhabi, UAE. As the national airline, "Etihad" means "union" or "alliance".',
            },
          },
          {
            type: 'list',
            items: [
              { uz: 'Bosh qarorgohi: Abu Dhabi, UAE', en: 'Headquarters: Abu Dhabi, UAE' },
              { uz: 'Hub: Abu Dhabi International Airport (AUH)', en: 'Hub: Abu Dhabi International Airport (AUH)' },
              { uz: '150+ yo\'nalish, 70+ mamlakat', en: '150+ destinations, 70+ countries' },
              { uz: 'Flot: A350, A380, B787, B777', en: 'Fleet: A350, A380, B787, B777' },
              { uz: '2030 yilgacha flotni ikki baravar oshirish rejasi', en: 'Plan to double fleet by 2030' },
            ],
          },
        ],
      },
    },
    {
      id: 'etihad-values',
      titleKey: 'phases.2.title',
      type: 'quiz',
      xpReward: 75,
      durationMinutes: 30,
      content: {
        blocks: [
          {
            type: 'heading',
            text: { uz: 'Etihad qadriyatlari', en: 'Etihad Values' },
          },
          {
            type: 'list',
            items: [
              { uz: 'Guest Obsessed — mehmonlarga g\'amxo\'rlik', en: 'Guest Obsessed — caring for guests' },
              { uz: 'Safety First — xavfsizlik birinchi o\'rinda', en: 'Safety First — safety is priority' },
              { uz: 'Innovation — innovatsiya va zamonaviylik', en: 'Innovation — modern hospitality' },
              { uz: 'Teamwork — jamoa bilan ishlash', en: 'Teamwork — working together' },
              { uz: 'Integrity — halollik va professionalizm', en: 'Integrity — honesty and professionalism' },
            ],
          },
          {
            type: 'quiz',
            quiz: {
              id: 'etihad-quiz',
              passingScore: 80,
              questions: [
                {
                  id: 'eq1',
                  question: { uz: 'Etihad qayerda tashkil etilgan?', en: 'Where was Etihad founded?' },
                  options: [
                    { uz: 'Dubai', en: 'Dubai' },
                    { uz: 'Abu Dhabi', en: 'Abu Dhabi' },
                    { uz: 'Doha', en: 'Doha' },
                    { uz: 'Riyadh', en: 'Riyadh' },
                  ],
                  correctIndex: 1,
                },
                {
                  id: 'eq2',
                  question: { uz: '"Etihad" so\'zi nimani anglatadi?', en: 'What does "Etihad" mean?' },
                  options: [
                    { uz: 'Parvoz', en: 'Flight' },
                    { uz: 'Ittifoq', en: 'Union/Alliance' },
                    { uz: 'Osmon', en: 'Sky' },
                    { uz: 'Yulduz', en: 'Star' },
                  ],
                  correctIndex: 1,
                },
                {
                  id: 'eq3',
                  question: { uz: 'Etihad hub aeroporti qaysi?', en: 'What is Etihad\'s hub airport?' },
                  options: [
                    { uz: 'DXB', en: 'DXB' },
                    { uz: 'AUH', en: 'AUH' },
                    { uz: 'DOH', en: 'DOH' },
                    { uz: 'JFK', en: 'JFK' },
                  ],
                  correctIndex: 1,
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 'uae-culture',
      titleKey: 'phases.2.title',
      type: 'text',
      xpReward: 50,
      durationMinutes: 20,
      content: {
        blocks: [
          {
            type: 'heading',
            text: { uz: 'UAE madaniyati', en: 'UAE Culture' },
          },
          {
            type: 'paragraph',
            text: {
              uz: 'Abu Dhabi da ishlash UAE madaniyati va qoidalarini bilishni talab qiladi. Hurmat, xushmuomalalik va madaniy sezgirlik muhim.',
              en: 'Working in Abu Dhabi requires understanding UAE culture and regulations. Respect, courtesy, and cultural sensitivity are essential.',
            },
          },
          {
            type: 'list',
            items: [
              { uz: 'Ramazon vaqtida ham alkogol xizmati ko\'rsatish kerak', en: 'Must serve alcohol even during Ramadan' },
              { uz: 'GCAA qoidalariga rioya qilish', en: 'Compliance with GCAA regulations' },
              { uz: 'Kompaniya ta\'minlangan uy-joy (shared accommodation)', en: 'Company-provided shared accommodation' },
              { uz: 'Tax-free maosh + parvoz soatlari uchun qo\'shimcha', en: 'Tax-free salary + flight hour pay' },
              { uz: '30 kun yillik ta\'til (probation dan keyin)', en: '30 days annual leave (post-probation)' },
            ],
          },
        ],
      },
    },
  ],
}
