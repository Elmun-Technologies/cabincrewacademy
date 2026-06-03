import type { Phase } from '@/types'

export const phase0: Phase = {
  id: 'phase-0',
  order: 0,
  titleKey: 'phases.0.title',
  descriptionKey: 'phases.0.desc',
  mechanic: 'checklist',
  estimatedDays: 2,
  unlockThreshold: 80,
  lessons: [
    {
      id: 'readiness-intro',
      titleKey: 'phases.0.title',
      type: 'text',
      xpReward: 50,
      durationMinutes: 15,
      content: {
        blocks: [
          {
            type: 'heading',
            text: {
              uz: 'Etihad Airways ga tayyorgarlik',
              en: 'Preparing for Etihad Airways',
            },
          },
          {
            type: 'paragraph',
            text: {
              uz: 'Kabina ekipaji (Cabin Crew) — bu faqat xizmat ko\'rsatish emas, balki xavfsizlik, professionalizm va xalqaro madaniyatlar bilan ishlash san\'ati. Etihad Airways dunyoning eng yaxshi aviakompaniyalaridan biri bo\'lib, yuqori standartlarga ega.',
              en: 'Cabin Crew is not just about service — it is the art of safety, professionalism, and working with international cultures. Etihad Airways is one of the world\'s best airlines with high standards.',
            },
          },
          {
            type: 'list',
            items: [
              { uz: 'Minimum yosh: 21', en: 'Minimum age: 21' },
              { uz: 'Minimum bo\'y: 163 sm', en: 'Minimum height: 163 cm' },
              { uz: 'Ingliz tilida erkin gapirish', en: 'Fluent English (spoken & written)' },
              { uz: 'O\'rta ma\'lumot (12-sinf)', en: 'High school diploma' },
              { uz: 'Tatu/pirsing ko\'rinmasligi kerak', en: 'No visible tattoos or piercings' },
              { uz: 'Flotation device bilan suza olish', en: 'Swim with flotation device' },
            ],
          },
          {
            type: 'checklist',
            items: [
              { id: 'c1', label: { uz: 'Men 21 yoshdan kattaman', en: 'I am 21+ years old' }, required: true },
              { id: 'c2', label: { uz: 'Bo\'yim 163 sm dan baland', en: 'My height is 163 cm+' }, required: true },
              { id: 'c3', label: { uz: 'Ingliz tilida erkin gapira olaman', en: 'I speak English fluently' }, required: true },
              { id: 'c4', label: { uz: 'O\'rta ma\'lumotim bor', en: 'I have high school education' }, required: true },
              { id: 'c5', label: { uz: 'Tatu/pirsing yo\'q yoki ko\'rinmaydi', en: 'No visible tattoos/piercings' }, required: true },
              { id: 'c6', label: { uz: 'Suzishni bilaman', en: 'I can swim' }, required: true },
              { id: 'c7', label: { uz: 'Cheklovsiz sayohat qila olaman', en: 'I can travel without restrictions' }, required: true },
            ],
          },
        ],
      },
    },
    {
      id: 'readiness-assessment',
      titleKey: 'phases.0.title',
      type: 'quiz',
      xpReward: 75,
      durationMinutes: 20,
      content: {
        blocks: [
          {
            type: 'quiz',
            quiz: {
              id: 'readiness-quiz',
              passingScore: 70,
              questions: [
                {
                  id: 'q1',
                  question: {
                    uz: 'Etihad minimum yosh talabi qancha?',
                    en: 'What is Etihad\'s minimum age requirement?',
                  },
                  options: [
                    { uz: '18 yosh', en: '18 years' },
                    { uz: '21 yosh', en: '21 years' },
                    { uz: '25 yosh', en: '25 years' },
                    { uz: '30 yosh', en: '30 years' },
                  ],
                  correctIndex: 1,
                  explanation: {
                    uz: 'Etihad minimum 21 yosh talab qiladi.',
                    en: 'Etihad requires minimum age of 21.',
                  },
                },
                {
                  id: 'q2',
                  question: {
                    uz: 'Minimum bo\'y talabi qancha?',
                    en: 'What is the minimum height requirement?',
                  },
                  options: [
                    { uz: '160 sm', en: '160 cm' },
                    { uz: '163 sm', en: '163 cm' },
                    { uz: '170 sm', en: '170 cm' },
                    { uz: '175 sm', en: '175 cm' },
                  ],
                  correctIndex: 1,
                },
                {
                  id: 'q3',
                  question: {
                    uz: 'Assessment Day da nima tekshiriladi?',
                    en: 'What is checked on Assessment Day?',
                  },
                  options: [
                    { uz: 'Faqat ingliz tili', en: 'Only English' },
                    { uz: 'Faqat bo\'y', en: 'Only height' },
                    { uz: 'Bo\'y, grooming, intervyu, guruh mashqi, ingliz tili', en: 'Height, grooming, interview, group exercise, English' },
                    { uz: 'Faqat CV', en: 'Only CV' },
                  ],
                  correctIndex: 2,
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
