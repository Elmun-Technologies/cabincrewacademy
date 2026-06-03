import type { Phase } from '@/types'

export const phase1: Phase = {
  id: 'phase-1',
  order: 1,
  titleKey: 'phases.1.title',
  descriptionKey: 'phases.1.desc',
  mechanic: 'dragdrop',
  estimatedDays: 7,
  unlockThreshold: 80,
  lessons: [
    {
      id: 'aviation-intro',
      titleKey: 'phases.1.title',
      type: 'text',
      xpReward: 50,
      durationMinutes: 25,
      content: {
        blocks: [
          {
            type: 'heading',
            text: { uz: 'Aviatsiya dunyosiga kirish', en: 'Introduction to Aviation' },
          },
          {
            type: 'paragraph',
            text: {
              uz: 'Aviatsiya — bu samolyotlar, aeroportlar, parvozlar va xavfsizlik qoidalaridan iborat katta soha. Kabina ekipaji bu tizimning muhim qismi.',
              en: 'Aviation encompasses aircraft, airports, flights, and safety regulations. Cabin crew is a vital part of this system.',
            },
          },
          {
            type: 'list',
            items: [
              { uz: 'Cabin Crew (FA/Flight Attendant) — kabina ekipaji a\'zosi', en: 'Cabin Crew (FA) — flight attendant' },
              { uz: 'Cockpit Crew — uchuvchilar', en: 'Cockpit Crew — pilots' },
              { uz: 'Purser/Senior FA — katta ekipaj a\'zosi', en: 'Purser/Senior FA — senior crew member' },
              { uz: 'Cabin Manager — kabina menejeri', en: 'Cabin Manager — cabin manager' },
              { uz: 'GCAA — UAE aviatsiya regulyatori', en: 'GCAA — UAE aviation regulator' },
              { uz: 'ICAO — xalqaro aviatsiya tashkiloti', en: 'ICAO — International Civil Aviation Organization' },
            ],
          },
        ],
      },
    },
    {
      id: 'aviation-terms',
      titleKey: 'phases.1.title',
      type: 'interactive',
      xpReward: 60,
      durationMinutes: 30,
      content: {
        blocks: [
          {
            type: 'heading',
            text: { uz: 'Aviatsiya terminlari', en: 'Aviation Terminology' },
          },
          {
            type: 'dragdrop',
            pairs: [
              { id: 'd1', term: { uz: 'Boarding', en: 'Boarding' }, definition: { uz: 'Samolyotga chiqish', en: 'Getting on the aircraft' } },
              { id: 'd2', term: { uz: 'Cabin', en: 'Cabin' }, definition: { uz: 'Yo\'lovchilar salon', en: 'Passenger compartment' } },
              { id: 'd3', term: { uz: 'Galley', en: 'Galley' }, definition: { uz: 'Oshxona/kitchen', en: 'Aircraft kitchen' } },
              { id: 'd4', term: { uz: 'Layover', en: 'Layover' }, definition: { uz: 'Oraliq to\'xtash', en: 'Stop between flights' } },
              { id: 'd5', term: { uz: 'Turbulence', en: 'Turbulence' }, definition: { uz: 'Turbulentlik', en: 'Air instability' } },
              { id: 'd6', term: { uz: 'Overhead bin', en: 'Overhead bin' }, definition: { uz: 'Yuqori yuk bo\'limi', en: 'Overhead storage compartment' } },
            ],
          },
        ],
      },
    },
    {
      id: 'aircraft-types',
      titleKey: 'phases.1.title',
      type: 'text',
      xpReward: 50,
      durationMinutes: 25,
      content: {
        blocks: [
          {
            type: 'heading',
            text: { uz: 'Samolyot turlari', en: 'Aircraft Types' },
          },
          {
            type: 'paragraph',
            text: {
              uz: 'Etihad Airways flotida Airbus A350, A380, Boeing 787, B777 kabi zamonaviy samolyotlar mavjud.',
              en: 'Etihad Airways fleet includes modern aircraft like Airbus A350, A380, Boeing 787, and B777.',
            },
          },
          {
            type: 'list',
            items: [
              { uz: 'Wide-body — keng fuzelyajli (A350, B787, B777)', en: 'Wide-body — A350, B787, B777' },
              { uz: 'Narrow-body — tor fuzelyajli (A320)', en: 'Narrow-body — A320' },
              { uz: 'Economy Class — iqtisodiy klass', en: 'Economy Class' },
              { uz: 'Business Class — biznes klass', en: 'Business Class' },
              { uz: 'First Class — birinchi klass (ba\'zi parvozlarda)', en: 'First Class' },
            ],
          },
          {
            type: 'quiz',
            quiz: {
              id: 'aircraft-quiz',
              passingScore: 70,
              questions: [
                {
                  id: 'aq1',
                  question: { uz: 'Galley nima?', en: 'What is a galley?' },
                  options: [
                    { uz: 'Oshxona', en: 'Kitchen' },
                    { uz: 'Tualet', en: 'Toilet' },
                    { uz: 'Cockpit', en: 'Cockpit' },
                    { uz: 'Bagaj', en: 'Baggage' },
                  ],
                  correctIndex: 0,
                },
                {
                  id: 'aq2',
                  question: { uz: 'Layover nima?', en: 'What is a layover?' },
                  options: [
                    { uz: 'Parvoz', en: 'Flight' },
                    { uz: 'Oraliq to\'xtash', en: 'Stop between flights' },
                    { uz: 'Evakuatsiya', en: 'Evacuation' },
                    { uz: 'Boarding', en: 'Boarding' },
                  ],
                  correctIndex: 1,
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
